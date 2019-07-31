import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Divider } from "react-native-elements"
import { connect } from "react-redux"
import agent from "../../../agent/index";
import journalBookCovers from "../../../components/journal/journalBookCovers"
import JournalBooks from "../../../components/journal/JournalBooks"

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class JournalListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalBooks: null,   // each element is like { journalBookId: 1, name: "vacation", coverId: 1 }
            journals: null,   // each element is like { journalBookId: 1, journals: [{ journalId: 1, journalUrl: ${url} }, ...] }
            cntJournalBookIndex: 0,
        }
        this.getJournalsByJournalBookIndex = this.getJournalsByJournalBookIndex.bind(this);
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.record.getJournalBooks(uId, token, uId);
        if (response.rescode === 0) {
            await this.setState({ journalBooks: response.journalBooks })
            let journals = [];
            await this.state.journalBooks.forEach(async journalBook => {
                const tmp = await agent.record.getJournals(uId, token, journalBook.journalBookId);
                if (tmp.rescode === 0)
                    journals.push(Object.assign({}, tmp, { journalBookId: journalBook.journalBookId }))
            })
            this.setState({ journals })
        }
    }

    getJournalsByJournalBookIndex() {
        const { journalBooks, journals, cntJournalBookIndex } = this.state;
        const journalBookId = journalBooks[cntJournalBookIndex].journalBookId;
        console.log("journalBookId: " + journalBookId)
        let targetJournals;
        journals.forEach(journal => {
            console.log("journal.journalBookId: " + journal.journalBookId)
            if (journal.journalBookId === journalBookId)
                targetJournals = journal.journals;
        })
        return targetJournals;
    }

    render() {
        const { journalBooks, journals, cntJournalBookIndex } = this.state;
        if (!journalBooks)
            return null;
        if (journalBooks.length === 0)
            return (<Text>No journals</Text>)
        return (
            <React.Fragment>
                <View style={{ borderWidth: 0 }}>
                    <JournalBooks
                        journalBooks={journalBooks}
                        cntJournalBookIndex={cntJournalBookIndex}
                        handleCntIndexChange={(index) => this.setState({ cntJournalBookIndex: index })}
                    />
                    <Card>
                        {journals &&
                            <View style={{ flexDirection: "row" }}>
                                {this.getJournalsByJournalBookIndex().map(journal => (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.push("JournalDetail", { journalUrl: journal.journalUrl })}
                                    >
                                        <Image source={{ uri: journal.journalUrl }}
                                            style={{ borderWidth: 1, width: 105, height: 143, margin: 10 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        }
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(JournalListScreen);
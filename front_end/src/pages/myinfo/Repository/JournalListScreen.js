import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Divider } from "react-native-elements"
import { connect } from "react-redux"
import agent from "../../../agent/index";
import journalBookCovers from "../../../components/journal/journalBookCovers"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})


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
            cntJournalBookName: '',
        }
        this.getJournalsByJournalBookName = this.getJournalsByJournalBookName.bind(this);
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.record.getJournalBooks(uId, token, uId);
        if (response.rescode === 0) {
            await this.setState({ journalBooks: response.journalBooks, cntJournalBookName: response.journalBooks[0].name })
            let journals = [];
            await this.state.journalBooks.forEach(async journalBook => {
                const tmp = await agent.record.getJournals(uId, token, journalBook.journalBookId);
                if (tmp.rescode === 0)
                    journals.push(Object.assign({}, tmp, { journalBookId: journalBook.journalBookId }))
            })
            this.setState({ journals })
        }
    }

    getJournalsByJournalBookName() {
        let journalBookId;
        this.state.journalBooks.forEach(journalBook => {
            if (journalBook.name === this.state.cntJournalBookName)
                journalBookId = journalBook.journalBookId;
        })
        let journals;
        this.state.journals.forEach(journal => {
            if (journal.journalBookId === journalBookId)
                journals = journal.journals;
        })
        return journals;
    }

    render() {
        const { journalBooks, journals, cntJournalBookName } = this.state;
        if (!journalBooks)
            return null;
        if (journalBooks.length === 0)
            return (<Text>No journals</Text>)
        return (
            <React.Fragment>
                <View style={{ borderWidth: 0 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        {journalBooks.map(journalBook => (
                            <TouchableOpacity onPress={() => this.setState({ cntJournalBookName: journalBook.name })}>
                                <Image source={journalBookCovers[journalBook.coverId]} style={{ width: 140, height: 190, margin: 10 }} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ borderWidth: 0, alignItems: "center" }}>
                        <Text style={{ fontSize: 20 }}>--{cntJournalBookName}--</Text>
                    </View>
                    <Card>
                        {journals &&
                            <View style={{ flexDirection: "row" }}>
                                {this.getJournalsByJournalBookName().map(journal => (
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
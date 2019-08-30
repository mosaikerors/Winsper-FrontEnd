import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Card, Divider, Overlay, Input } from "react-native-elements"
import { connect } from "react-redux"
import agent from "../../../agent/index";
import JournalBooks from "../../../components/journal/JournalBooks"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import journalBookCovers from "../../../components/journal/journalBookCovers"
import Carousel from 'react-native-snap-carousel';

const { width: windowWidth, height: viewportHeight } = Dimensions.get('window');

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
            journalToBeDeleted: null,
            isCreatingJournalBook: false,
            targetJournals: null,
            journalBookCoverId: 0,
            journalBookName: null,
        }
        this.updateState = this.updateState.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this)
        this.createJournalBook = this.createJournalBook.bind(this)
        this.updateTargetJournals = this.updateTargetJournals.bind(this)
        this.renderJournalBookCovers = this.renderJournalBookCovers.bind(this)
    }

    async createJournalBook() {
        const { uId, token } = this.props;
        const { journalBookName, journalBookCoverId } = this.state;

        const response = await agent.record.createJournalBook(uId, token, journalBookName, journalBookCoverId)
        console.log("response", response)
        if (response.rescode === 0) {
            this.setState({ isCreatingJournalBook: false })
            this.updateState()
        }
    }

    async deleteJournal() {
        const { uId, token } = this.props;
        const { journalBooks, cntJournalBookIndex, journalToBeDeleted } = this.state;
        const journalBookId = journalBooks[cntJournalBookIndex].journalBookId;
        await agent.record.deleteJournal(uId, token, journalBookId, journalToBeDeleted)
        this.updateTargetJournals()
    }

    async updateState() {
        const { uId, token } = this.props;
        const { cntJournalBookIndex } = this.state
        const response = await agent.record.getJournalBooks(uId, token, uId);
        if (response.rescode === 0) {
            await this.setState({ journalBooks: response.journalBooks })
            this.updateTargetJournals()
        }
    }

    async updateTargetJournals() {
        const { uId, token } = this.props;
        const { cntJournalBookIndex } = this.state
        const response = await agent.record.getJournals(uId, token, this.state.journalBooks[cntJournalBookIndex].journalBookId);
        if (response.rescode === 0) {
            this.setState({ targetJournals: response.journals })
        }
    }

    componentWillMount() {
        this.updateState()
    }

    renderJournalBookCovers({ item }) {
        return (
            <View>
                <Image
                    source={item}
                    style={{ height: 210, width: 150, borderRadius: 8 }}
                />
            </View>
        )
    }

    render() {
        const { journalBooks, cntJournalBookIndex, journalToBeDeleted, isCreatingJournalBook, targetJournals, journalBookName } = this.state;

        if (!journalBooks)
            return null;
        if (journalBooks.length === 0)
            return (<Text>No journals</Text>)
        return (
            <React.Fragment>
                <View style={{ height: 40, flexDirection: 'row-reverse' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 0, width: 120, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                        onPress={() => this.setState({ isCreatingJournalBook: true })}
                    >
                        <FontAwesome name={"plus"} size={20} />
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>新建手账本</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0, height: 250 }}>
                    <JournalBooks
                        journalBooks={journalBooks}
                        cntJournalBookIndex={cntJournalBookIndex}
                        snapTo={(cntJournalBookIndex) => this.setState({ cntJournalBookIndex }, () => this.updateTargetJournals())}
                        canLongPress={true}
                        updateState={this.updateState}
                        sliderWidth={windowWidth}
                    />
                </View>
                {targetJournals &&
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {targetJournals.map(journal => (
                            <View style={{ borderWidth: 0, width: "33.3%" }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.push("JournalDetail", { journalUrl: journal.journalUrl })}
                                    onLongPress={() => this.setState({ journalToBeDeleted: journal.journalId })}
                                    style={{ borderWidth: 0, alignItems: "center" }}
                                >
                                    <Image source={{ uri: journal.journalUrl }}
                                        style={{ borderWidth: 1, width: "88%", height: 160, margin: 10 }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", display: journalToBeDeleted === journal.journalId ? "flex" : "none" }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => this.setState({ journalToBeDeleted: null })}>
                                            <FontAwesome name="close" size={28} style={{ margin: 10 }} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={this.deleteJournal}>
                                        <FontAwesome name="trash" size={28} style={{ margin: 10 }} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                }

                <Overlay overlayBackgroundColor="white" isVisible={isCreatingJournalBook}
                    overlayStyle={{ opacity: 0.8, height: 375 }}
                >
                    <View style={{}}>
                        <Text style={{ fontSize: 28, alignSelf: "center" }}>选择手账本封面</Text>
                    </View>
                    <Divider style={{ marginBottom: 10 }} />

                    <View style={{ borderWidth: 0 }}>
                        <Carousel
                            data={journalBookCovers}
                            renderItem={this.renderJournalBookCovers}
                            sliderWidth={325}
                            itemWidth={180}
                            firstItem={0}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.7}
                            onSnapToItem={(journalBookCoverId) => this.setState({ journalBookCoverId })}
                        />
                    </View>
                    <Divider style={{ marginTop: 5 }} />
                    <View style={{ borderWidth: 0, marginVertical: 10 }}>
                        <Input
                            placeholder={"手账本名"}
                            inputContainerStyle={{
                                borderRadius: 50, borderWidth: 2, borderBottomWidth: 2,
                                width: 150, alignSelf: "center", paddingLeft: 10
                            }}
                            value={journalBookName}
                            onChangeText={journalBookName => this.setState({ journalBookName })}
                        />
                    </View>
                    <View style={{ borderWidth: 0, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ isCreatingJournalBook: false })}>
                                <FontAwesome name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.createJournalBook}>
                            <FontAwesome name="check" size={24} color="green" />
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(JournalListScreen);
import React from 'react';
import { View, TouchableOpacity, Image, Text } from "react-native"
import { Overlay, Divider } from "react-native-elements"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from "react-redux"
import JournalBooks from "./JournalBooks"
import agent from "../../agent/index"

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class JournalBookSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalBooks: null,
            cntJournalBookIndex: 0
        }
    }
    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.record.getJournalBooks(uId, token, uId);
        if (response.rescode === 0)
            this.setState({ journalBooks: response.journalBooks })
    }
    render() {
        const { isVisible } = this.props;
        const { journalBooks, cntJournalBookIndex } = this.state;
        if (!journalBooks)
            return null;
        return (
            <React.Fragment>
                <Overlay overlayBackgroundColor="white" isVisible={isVisible}
                    overlayStyle={{ opacity: 0.8, height: 320 }}
                >
                    <View style={{}}>
                        <Text style={{ fontSize: 28, alignSelf: "center" }}>选择手账本</Text>
                    </View>
                    <Divider style={{ marginBottom: 10 }} />

                    <JournalBooks
                        journalBooks={journalBooks}
                        cntJournalBookIndex={cntJournalBookIndex}
                        handleCntIndexChange={(index) => this.setState({ cntJournalBookIndex: index })}
                    />

                    <View style={{ borderWidth: 0, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.props.handleCancel}>
                                <FontAwesome name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.handleOk(journalBooks[cntJournalBookIndex].journalBookId)}
                        >
                            <FontAwesome name="check" size={24} color="green" />
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(JournalBookSelector);
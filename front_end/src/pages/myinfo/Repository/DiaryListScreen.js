import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator';
import TimeAxis from "../../../components/diary/TimeAxis"
import { connect } from "react-redux";
import agent from "../../../agent/index";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        height: 60,
        width: '100%',
        marginTop: 40,
        marginLeft: 20
    }
})

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track", 1, 1, 1, 1, 1, 1, 1, 11,];

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

class DiaryListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.record.getDiaryList(uId, token, uId);    // 看自己的日记
        console.log(response)
        if (response.rescode === 0)
            this.setState({ diaries: response.diaries });
    }

    render() {
        const { diaries } = this.state;
        return (
            <React.Fragment>
                <ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TimeAxis num={diaries.length} />
                        <View style={{  flex: 1 }}>
                            {diaries.map((diary, index) => (
                                <View style={[styles.block, index === 0 && { marginTop: 62 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.push("DiaryDetail", { diaryId: diary.diaryId })}>
                                        <Text style={{ fontSize: 24 }}>{diary.time}</Text>
                                        <Text style={{ fontSize: 24 }}>{diary.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(DiaryListScreen);
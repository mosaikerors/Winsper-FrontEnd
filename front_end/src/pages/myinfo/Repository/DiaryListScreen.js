import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator';
import TimeAxis from "../../../components/diary/TimeAxis"
import { connect } from "react-redux";
import agent from "../../../agent/index";
import Timeline from 'react-native-timeline-listview'
import { transformDate } from "../../../util"
import Loading from "../../../components/Loading"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

class DiaryListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: null,
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId)
        }
        this.renderDetail = this.renderDetail.bind(this)
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const { otherUId } = this.state
        const response = await agent.record.getDiaryList(uId, token, otherUId);

        if (response.rescode === 0) {
            response.diaries.forEach(diary => {
                diary.time = transformDate(diary.time, false)
            });
            this.setState({ diaries: response.diaries });
        }
    }

    renderDetail(rowData) {
        return (
            <View style={{ borderWidth: 0, marginBottom: 40 }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.push("DiaryDetail", { diaryId: rowData.diaryId })}
                    style={{ borderWidth: 0, paddingTop: 15, paddingBottom: 15, position: "relative", bottom: 25 }}
                >

                    <Text style={{ fontSize: 24 }} >{rowData.title}</Text>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        const { diaries } = this.state;
        if (!diaries)
            return <Loading />;
        return (
            <React.Fragment>
                <ScrollView style={{ borderWidth: 0, paddingLeft: 0, paddingTop: 30 }}>
                    <Timeline
                        renderDetail={this.renderDetail}
                        data={diaries}
                        innerCircle={'dot'}
                        circleSize={18}
                        timeContainerStyle={{ minWidth: 110, borderWidth: 0 }}
                        timeStyle={{ width: 110, borderWidth: 0, fontSize: 20 }}
                    />
                </ScrollView>
                {/*
                    <ScrollView>
                        <View style={{ flexDirection: "row" }}>
                            <TimeAxis num={diaries.length} />
                            <View style={{ flex: 1 }}>
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
                                </ScrollView>*/}
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(DiaryListScreen);
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
import EmptyList from "../../../components/EmptyList"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import theme from "../../../theme"

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
        this.updateState = this.updateState.bind(this)
    }

    async updateState() {
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

    componentWillMount() {
        this.updateState()   
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.updateState();
        }
    }

    renderDetail(rowData) {
        const isMe = this.state.otherUId === this.props.uId
        return (
            <View style={{ borderWidth: 0, marginBottom: 40 }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.push("DiaryDetail", { diaryId: rowData.diaryId, isMe })}
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
        if (diaries.length === 0)
            return <EmptyList field="日记列表" />
        return (
            <React.Fragment>
                <ScrollView style={{ borderWidth: 0, paddingLeft: 0, paddingTop: 30, backgroundColor: theme.palette.sky[0] }}>
                    <Timeline
                        renderDetail={this.renderDetail}
                        data={diaries}
                        innerCircle={'dot'}
                        circleSize={18}
                        lineColor={theme.palette.sky[2]}
                        circleColor={theme.palette.sky[2]}
                        dotColor={theme.palette.sky[0]}
                        timeContainerStyle={{ minWidth: 110, borderWidth: 0 }}
                        timeStyle={{ width: 110, borderWidth: 0, fontSize: 20 }}
                    />
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps)(DiaryListScreen));
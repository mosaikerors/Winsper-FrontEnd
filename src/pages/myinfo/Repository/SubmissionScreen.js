import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements'
import { Divider } from 'react-native-elements'
import { connect } from "react-redux";
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent/index";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from "../../../components/Loading"
import EmptyList from "../../../components/EmptyList"
import theme from "../../../theme"
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import SubmissionList from "../../../components/myinfo/SubmissionList"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});


class SubmissionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mySubmission: null,
            selectedSubmission: null,
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId),
        }
        this.updateState = this.updateState.bind(this)
    }

    async updateState() {
        const { uId, token } = this.props;
        const { otherUId } = this.state
        let response;
        response = await agent.hean.getSelectedSubmissions(uId, token, new Date().getTime());
        if (response.rescode === 0) {
            let heans = [];
            let tmp = {};
            response.heanCards.forEach((heanCard, index) => {
                if ((index + 1) % 2 !== 0) {
                    tmp.left = heanCard;
                }
                else {
                    tmp.right = heanCard;
                    heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
                }
            });
            if (response.heanCards.length % 2 !== 0) {
                tmp.right = null;
                heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
            }
            this.setState({ selectedSubmission: heans });
        }
        response = await agent.hean.getSubmissionsById(uId, token, otherUId)
        if (response.rescode === 0) {
            let heans = [];
            let tmp = {};
            response.heanCards.forEach((heanCard, index) => {
                if ((index + 1) % 2 !== 0) {
                    tmp.left = heanCard;
                }
                else {
                    tmp.right = heanCard;
                    heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
                }
            });
            if (response.heanCards.length % 2 !== 0) {
                tmp.right = null;
                heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
            }
            this.setState({ mySubmission: heans });
        }
    }

    componentWillMount() {
        this.updateState();
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.updateState();
        }
    }

    render() {
        const { selectedSubmission, mySubmission } = this.state;
        return (
            <React.Fragment>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} initialPage={0} style={{ backgroundColor: theme.palette.sky[0] }}>
                    <SubmissionList tabLabel="投稿栏" heans={selectedSubmission} navigation={this.props.navigation} />
                    <SubmissionList tabLabel="我的投稿" heans={mySubmission} navigation={this.props.navigation} />
                </ScrollableTabView>
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SubmissionScreen));
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import FollowList from "../../components/myinfo/FollowList"
import { connect } from "react-redux"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import agent from "../../agent/index"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class FollowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mutualFollow: null,
            followings: null,
            followers: null
        }
        this.updateState = this.updateState.bind(this)
    }

    async updateState() {
        const { uId, token } = this.props;
        let response;
        response = await agent.user.getMutualFollow(uId, token)
        console.log("111111111: ", response)
        if (response.rescode === 0)
            this.setState({ mutualFollow: response.followlist })
        response = await agent.user.getFollowings(uId, token)
        if (response.rescode === 0)
            this.setState({ followings: response.followlist })
        response = await agent.user.getFollowers(uId, token)
        if (response.rescode === 0)
            this.setState({ followers: response.followlist })
    }

    componentWillMount() {
        this.updateState();
    }

    componentWillReceiveProps(nextProps) {
        // if you will leave this page, grab newest data
        if (!nextProps.isFocused) {
            this.updateState();
        }
    }

    render() {
        const initTab = this.props.navigation.getParam("tab", 0);
        const { mutualFollow, followings, followers } = this.state;
        console.log(mutualFollow, followings, followers)
        return (
            <React.Fragment>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} initialPage={initTab} style={{ marginTop: 0 }}>
                    <FollowList tabLabel="互相关注" followlist={mutualFollow} navigation={this.props.navigation} />
                    <FollowList tabLabel="我的关注" followlist={followings} navigation={this.props.navigation} />
                    <FollowList tabLabel="我的粉丝" followlist={followers} navigation={this.props.navigation} />
                </ScrollableTabView>
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps)(FollowScreen));
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import TopBanner from "../../components/myinfo/TopBanner";
import FollowBanner from "../../components/myinfo/FollowBanner";
import DetailedBlock from "../../components/myinfo/DetailedBlock";
import BottomBanner from "../../components/myinfo/BottomBanner";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
    mutualFollow: state.user.mutualFollow,
    following: state.user.following,
    followers: state.user.followers
})

const mapDispatchToProps = dispatch => ({
})

class LoggedInScreen extends React.Component {
    static navigationOptions = {
        title: '我的',
    };
    render() {
        return (
            <React.Fragment>
                <TopBanner />
                <Divider />
                <FollowBanner navigation={this.props.navigation} />
                <Divider />
                <DetailedBlock navigation={this.props.navigation} />
                <BottomBanner navigation={this.props.navigation} />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInScreen);
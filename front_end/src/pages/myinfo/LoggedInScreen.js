import React from "react";
import { Divider } from 'react-native-elements'
import { connect } from "react-redux"
import TopBanner from "../../components/myinfo/loggedInView/TopBanner";
import FollowBanner from "../../components/myinfo/loggedInView/FollowBanner";
import DetailedBlock from "../../components/myinfo/loggedInView/DetailedBlock";
import BottomBanner from "../../components/myinfo/loggedInView/BottomBanner";

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
                <TopBanner isMe={true} />
                <Divider />
                <FollowBanner navigation={this.props.navigation} />
                <Divider />
                <DetailedBlock navigation={this.props.navigation} isMe={true} />
                <BottomBanner navigation={this.props.navigation} />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInScreen);
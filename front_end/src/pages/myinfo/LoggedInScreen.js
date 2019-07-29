import React from "react";
import { Divider } from 'react-native-elements'
import { connect } from "react-redux"
import TopBanner from "../../components/myinfo/loggedInView/TopBanner";
import FollowBanner from "../../components/myinfo/loggedInView/FollowBanner";
import DetailedBlock from "../../components/myinfo/loggedInView/DetailedBlock";
import BottomBanner from "../../components/myinfo/loggedInView/BottomBanner";

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class LoggedInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myinfo: {}
        }
    }

    async componentWillMount() {
        const response = await agent.user.getMyInfo(uId, token)
        if (response.rescode === 0)
            this.setState({ myinfo: response })
    }

    render() {
        const { avatar, username, feather, mutualFollow, following, followers, hasChecked } = this.state.myinfo;
        return (
            <React.Fragment>
                <TopBanner isMe={true} avatar={avatar} username={username} feather={feather} hasChecked={hasChecked} />
                <Divider />
                <FollowBanner navigation={this.props.navigation} mutualFollow={mutualFollow} following={following} followers={followers} />
                <Divider />
                <DetailedBlock navigation={this.props.navigation} isMe={true} />
                <BottomBanner navigation={this.props.navigation} />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInScreen);
import React from "react";
import { Text, View } from "react-native"
import { Divider } from 'react-native-elements'
import { connect } from "react-redux"
import TopBanner from "../../components/myinfo/loggedInView/TopBanner";
import FollowBanner from "../../components/myinfo/loggedInView/FollowBanner";
import DetailedBlock from "../../components/myinfo/loggedInView/DetailedBlock";
import BottomBanner from "../../components/myinfo/loggedInView/BottomBanner";
import agent from "../../agent/index"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
    type: state.message.type
})

const mapDispatchToProps = dispatch => ({
})

class LoggedInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myinfo: null
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const response = await agent.user.getMyInfo(uId, token)
        if (response.rescode === 0)
            this.setState({ myinfo: response })
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
        if (!this.state.myinfo)
            return null;
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
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(LoggedInScreen));
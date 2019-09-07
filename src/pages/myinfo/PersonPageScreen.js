import React from "react";
import { View } from "react-native"
import { Divider } from 'react-native-elements'
import { connect } from "react-redux"
import TopBanner from "../../components/myinfo/loggedInView/TopBanner";
import FollowBanner from "../../components/myinfo/loggedInView/FollowBanner";
import DetailedBlock from "../../components/myinfo/loggedInView/DetailedBlock";
import BottomBanner from "../../components/myinfo/loggedInView/BottomBanner";
import agent from "../../agent/index";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import Loading from "../../components/Loading"
import theme from "../../theme"

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
})

const mapDispatchToProps = dispatch => ({
})

class PersonPageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        // 需要传进来一个 uId
        const otherUId = this.props.navigation.getParam("uId", 0);
        const { uId, token } = this.props;
        const response = await agent.user.getOthersInfo(uId, token, otherUId);
        console.log("res", response);
        if (response.rescode === 0)
            this.setState({ userInfo: Object.assign({}, response, { otherUId, avatar: response.avater }) });
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
        if (!this.state.userInfo)
            return <Loading />;
        const { avatar, username, feather, mutualFollow, following, followers, hasFollowed, otherUId } = this.state.userInfo;
        return (
            <React.Fragment>
                <TopBanner isMe={false} avatar={avatar} username={username} feather={feather} hasFollowed={hasFollowed} otherUId={otherUId} />
                <Divider />
                {/* userInfo 里除了隐私设置还有其他一些信息比如 username，但是这里为了方便，选择将整个 userInfo 传进去，尽管只用到了其中的隐私设置 */}
                <DetailedBlock navigation={this.props.navigation} privacy={this.state.userInfo} isMe={false} otherUId={otherUId} />
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(PersonPageScreen));
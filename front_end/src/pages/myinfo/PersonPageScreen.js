import React from "react";
import { Divider } from 'react-native-elements'
import { connect } from "react-redux"
import TopBanner from "../../components/myinfo/loggedInView/TopBanner";
import FollowBanner from "../../components/myinfo/loggedInView/FollowBanner";
import DetailedBlock from "../../components/myinfo/loggedInView/DetailedBlock";
import BottomBanner from "../../components/myinfo/loggedInView/BottomBanner";
import agent from "../../agent/index";

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
            userInfo: {}
        }
    }
    async componentWillMount() {
        const otherUId = this.props.navigation.getParam("uId", 0);
        const { uId, token } = this.props;
        const response = await agent.user.getOthersInfo(uId, token, otherUId);
        if (response.rescode === 0)
            this.setState({ userInfo: response });
    }

    // todo: 他人主页
    render() {
        return (
            <React.Fragment>
                <TopBanner isMe={false} />
                <Divider />
                <FollowBanner navigation={this.props.navigation} />
                <Divider />
                {/* userInfo 里除了隐私设置还有其他一些信息比如 username，但是这里为了方便，选择将整个 userInfo 传进去，尽管只用到了其中的隐私设置 */}
                <DetailedBlock navigation={this.props.navigation} privacy={this.state.userInfo} isMe={false} />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonPageScreen);
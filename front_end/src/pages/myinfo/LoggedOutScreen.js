import React from "react";
import { ImageBackground } from "react-native";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import Signup from "../../components/myinfo/Signup";
import Signin from "../../components/myinfo/Signin";
import ForgetPassword from "../../components/myinfo/ForgetPassword"
import { connect } from "react-redux"
import agent from "../../agent/index"
import { StackActions, NavigationActions } from "react-navigation";

const backgroundImage = require("../../../images/p6.jpg")

const login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedIn' })
    ]
});

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
    needsAutoLogin: state.common.needsAutoLogin
})

const mapDispatchToProps = dispatch => ({
    onLoggedIn: (response) =>
        dispatch({ type: 'SIGN_IN', payload: response }),
    onMount: () =>
        dispatch({ type: 'AUTO_LOGIN' }),
    onReceiveMessage: () =>
        dispatch({ type: "RECEIVE_MESSAGE" })
});

class LoggedOutScreen extends React.Component {
    constructor(props) {
        super(props)

    }

    async componentWillMount() {
        const { uId, token, needsAutoLogin } = this.props;
        if (needsAutoLogin) {
            const response = await agent.user.nextSignin(uId, token)
            if (response.rescode === 0) {
                this.props.onLoggedIn(response)
                this.props.navigation.dispatch(login);
                agent.ws = new WebSocket(`ws://202.120.40.8:30525/websocket?senderUId=${response.uId}`);
                agent.ws.onopen = function () {
                    console.log('open');
                };
                agent.ws.onmessage = (e) => {
                    const message = eval("(" + e.data + ")");
                    console.log("ws: " + message);
                    this.props.onReceiveMessage()
                };
                agent.ws.onclose = function () {
                    console.log('close');
                };
            }
        }
        this.props.onMount()
    }

    render() {
        return (
            <React.Fragment>
                <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                    <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{ marginTop: 40 }}>
                        <Signup tabLabel="注册" navigation={this.props.navigation} />
                        <Signin tabLabel="登录" navigation={this.props.navigation} />
                        <ForgetPassword tabLabel="忘记密码" navigation={this.props.navigation} />
                    </ScrollableTabView>
                </ImageBackground>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedOutScreen);
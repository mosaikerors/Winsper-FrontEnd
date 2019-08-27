import React from "react";
import { ImageBackground } from "react-native";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import Signup from "../../components/myinfo/Signup";
import Signin from "../../components/myinfo/Signin";
import ForgetPassword from "../../components/myinfo/ForgetPassword"

const backgroundImage = require("../../../images/p6.jpg")

class LoggedOutScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                    <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{ marginTop: 40 }}>
                        <Signup tabLabel="注册" />
                        <Signin tabLabel="登录" navigation={this.props.navigation} />
                        <ForgetPassword tabLabel="忘记密码" />
                    </ScrollableTabView>
                </ImageBackground>
            </React.Fragment>
        );
    }
}
export default LoggedOutScreen;
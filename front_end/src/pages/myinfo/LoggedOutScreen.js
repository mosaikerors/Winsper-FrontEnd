import React from "react";
import { Text, View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import Signup from "../../components/myinfo/Signup";
import Signin from "../../components/myinfo/Signin";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    attendance: {
        marginTop: 46,
        marginRight: 34,
        //width: 70,
        height: 40
    },
    checked: {
        width: 90
    },
})

const backgroundImage = require("../../../images/p6.jpg")

class LoggedOutScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                    <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{ marginTop: 40 }} >
                        <Signup tabLabel="注册" />
                        <Signin tabLabel="登录" navigation={this.props.navigation} />
                    </ScrollableTabView>
                </ImageBackground>
            </React.Fragment>
        );
    }
}
export default LoggedOutScreen;
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
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



class LoggedOutScreen extends React.Component {
    static navigationOptions = {
        title: '风语',
    };
    render() {
        return (
            <React.Fragment>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />}>
                    <Signup tabLabel="注册" />
                    <Signin tabLabel="登录" navigation={this.props.navigation} />
                </ScrollableTabView>
            </React.Fragment>
        );
    }
}
export default LoggedOutScreen;
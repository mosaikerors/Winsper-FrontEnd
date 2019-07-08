import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import Signup from "../../components/myinfo/Signup";
import Signin from "../../components/myinfo/Signin";

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

const login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedIn' })
    ]
});

class LoggedOutScreen extends React.Component {
    static navigationOptions = {
        title: '风语',
    };
    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    <Signup />
                    <Signin />
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default LoggedOutScreen;
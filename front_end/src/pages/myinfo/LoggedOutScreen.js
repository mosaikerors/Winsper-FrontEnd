import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import TopBanner from "../../components/myinfo/TopBanner";
import FollowBanner from "../../components/myinfo/FollowBanner";
import DetailedBlock from "../../components/myinfo/DetailedBlock";
import BottomBanner from "../../components/myinfo/BottomBanner";

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
                <Button containerStyle={[styles.attendance, styles.border, styles.checked]}
                    title="登录"
                    onPress={() => this.setState({ checked: false })}
                />
            </React.Fragment>
        );
    }
}
export default LoggedOutScreen;
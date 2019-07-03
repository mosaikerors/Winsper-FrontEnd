import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider } from 'react-native-elements'
import TopBanner from "../../components/myinfo/TopBanner";
import FollowBanner from "../../components/myinfo/FollowBanner";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

class SettingsScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TopBanner />
                <Divider />
                <FollowBanner />
                <Divider />
            </React.Fragment>
        );
    }
}
export default SettingsScreen;
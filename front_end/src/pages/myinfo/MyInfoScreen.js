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
})

class SettingsScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TopBanner />
                <Divider />
                <FollowBanner />
                <Divider />
                <DetailedBlock />
                <BottomBanner />
            </React.Fragment>
        );
    }
}
export default SettingsScreen;
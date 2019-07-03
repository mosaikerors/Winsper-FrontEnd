import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from 'react-native-elements'
import TopBanner from "../../components/myinfo/TopBanner";

const styles = StyleSheet.create({
    border: {
        //borderWidth:1,
    },
    username: {
        marginTop: 22,
        marginLeft: 8,
        padding: 10,
        paddingBottom: 6,
        fontSize: 24,
        fontWeight: 'bold',
        borderStyle: 'solid',
        //borderWidth: 1,
    },
    feather: {
        marginLeft: 12,
        padding: 10,
        paddingTop: 6,
        //borderWidth:1
    },
    attendance: {
        marginTop: 50,
        marginRight: 34,
        width: 70,
        height:40
    }
})

class SettingsScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TopBanner />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>MyInfo!</Text>
                </View>
            </React.Fragment>
        );
    }
}
export default SettingsScreen;
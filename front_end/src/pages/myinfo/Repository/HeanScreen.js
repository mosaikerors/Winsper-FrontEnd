import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'
import HeanCard from "../../../components/common/HeanCard";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
];

class HeanScreen extends React.Component {
    static navigationOptions = {
        title: "我的函"
    };
    render() {
        return (
            <React.Fragment>
                <View>
                    <HeanCard />
                </View>
            </React.Fragment>
        );
    }
}
export default HeanScreen;
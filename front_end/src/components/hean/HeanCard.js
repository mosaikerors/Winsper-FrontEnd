import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image, StyleSheet, Platform
} from 'react-native';
import {
    getTheme
} from 'react-native-material-kit';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Divider } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 18,
        borderWidth: 1
    },
    image: {
        borderWidth: 1,
    },
    title: {
        marginTop: 12,
        marginLeft: 5,
        marginBottom: 5
    },
});

const theme = getTheme();
const backgroundImage = require("../../../images/p6.jpg")

class HeanCard extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>

                    <Image source={backgroundImage} style={{ height: 250, width: "100%" }} />

                    <View style={styles.title}>
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                            text
                        </Text>
                    </View>

                    <Divider />

                    <View style={{ borderWidth: 0, marginBottom: 5 }}>
                        <Text style={{ fontSize: 16 }}>
                            contentqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                        </Text>
                    </View>

                    <Divider />

                    <View style={{ flexDirection: "row-reverse", marginTop: 10 }}>
                        <View style={{ width: 50, flexDirection: "row" }}>
                            <MaterialIcons
                                style={{ marginRight: 5 }}
                                size={20}
                                name={"favorite"} />
                            <Text>{5}</Text>
                        </View>
                        <View style={{ width: 50, flexDirection: "row" }}>
                            <MaterialIcons
                                style={{ marginRight: 5 }}
                                size={20}
                                name={"like2"} />
                            <Text>{4}</Text>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}

export default HeanCard;
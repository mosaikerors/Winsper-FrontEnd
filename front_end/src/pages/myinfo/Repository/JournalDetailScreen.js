import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";

class JournalDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalUrl: this.props.navigation.getParam("journalUrl", null)
        }
    }

    render() {
        const { journalUrl } = this.state;
        if (!journalUrl)
            return null;
        return (
            <React.Fragment>
                <Image source={{ uri: journalUrl }} style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }} />
            </React.Fragment>
        );
    }
}
export default (JournalDetailScreen);
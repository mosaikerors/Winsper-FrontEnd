import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        flexDirection: "row"
    },
    general: {
        width: '65%',
        marginTop: 50,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: '设置',
    };
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={[styles.input, styles.general]}>
                        <View style={{ justifyContent: 'center', marginRight: 8 }}><Text>Username</Text></View>
                        <TextInput
                            style={{ borderWidth: 1, width: "75%" }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    <View style={[styles.general]}>
                        <Button
                            title="确认"
                            onPress={() => this.props.navigation.pop()}
                        />
                    </View>
                </View>
                <Text>{this.state.text}</Text>
            </React.Fragment>
        );
    }
}
export default SettingsScreen;
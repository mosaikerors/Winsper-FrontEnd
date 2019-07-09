import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import agent from "../../agent";
import { connect } from "react-redux";

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

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
})

const mapDispatchToProps = dispatch => ({
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
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { uId, token } = this.props;
        const newUsername = this.state.text;
        const response = await agent.user.updateInfo(uId, newUsername, token)
        console.log(response)
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
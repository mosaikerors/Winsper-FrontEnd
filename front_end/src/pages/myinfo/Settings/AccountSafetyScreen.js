import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import agent from "../../../agent";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign"
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

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
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (newUsername) =>
        dispatch({ type: "UPDATE_INFO", payload: { newUsername } })
})

class AccountSafetyScreen extends React.Component {
    static navigationOptions = {
        title: '设置',
    };
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { uId, token } = this.props;
        const newUsername = this.state.username;
        const response = await agent.user.updateInfo(uId, newUsername, token)
        this.props.onSubmit(response.newUsername);
        console.log(response)
        //this.props.navigation.pop()
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={[styles.input, styles.general]}>
                        <View style={{ justifyContent: 'center', marginRight: 8 }}><Text>Username</Text></View>
                        <TextInput
                            style={{ borderWidth: 1, width: "75%" }}
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                    </View>
                    <View style={[styles.general]}>
                        <Button
                            title="确认"
                            onPress={this.submit}
                        />
                    </View>
                </View>
                <View>
                    <Text>{this.props.username}</Text>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountSafetyScreen);
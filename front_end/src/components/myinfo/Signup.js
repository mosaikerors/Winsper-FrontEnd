import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import agent from "../../agent"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    label: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        flex: 1
    },
    input: {
        width: 300,
        borderWidth: 1,
        height: 40
    },
    codeInput: {
        flex: 1,
        marginRight: 5,
        borderWidth: 1,
        height: 40
    },
    labelAndInput: {
        flexDirection: 'row',
        width: 350,
        marginTop: 10
    },
    submitButtonContainer: {
        marginTop: 10,
        marginBottom: -5,
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButton: {
        width: 70,
    }
})

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            phone: '',
            code: '',
            username: '',
            password: '',
        }
        this.updateState = this.updateState.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.submit = this.submit.bind(this);
    }

    async sendCode() {
        console.log(this.state.phone)
        const response = await agent.user.sendCode(this.state.phone);
        this.setState({
            token: response.token
        })
        console.log(response)
    }

    async submit() {
        const { token, phone, code, username, password } = this.state;
        const response = await agent.user.sigup(token, phone, code, username, password);
        console.log(response);
    }

    updateState(field, text) {
        this.setState({
            [field]: text
        });
    }


    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Card title="注册" containerStyle={{ marginBottom: 50 }}>
                        <View style={styles.labelAndInput}>
                            <View style={[styles.label]}>
                                <Text>手机号</Text>
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <TextInput style={styles.input} onChangeText={text => this.updateState('phone', text)} />
                            </View>
                        </View>
                        <View style={styles.labelAndInput}>
                            <View style={[styles.label]}>
                                <Text>验证码</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: 300 }}>
                                <TextInput style={styles.codeInput} onChangeText={text => this.updateState('code', text)} />

                                <Button title="获取验证码" onPress={this.sendCode} />
                            </View>
                        </View>
                        <View style={styles.labelAndInput}>
                            <View style={[styles.label]}>
                                <Text>用户名</Text>
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <TextInput style={styles.input} onChangeText={text => this.updateState('username', text)} />
                            </View>
                        </View>
                        <View style={styles.labelAndInput}>
                            <View style={[styles.label]}>
                                <Text>密码</Text>
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <TextInput style={styles.input} onChangeText={text => this.updateState('password', text)} />
                            </View>
                        </View>
                        <View style={styles.submitButtonContainer}>
                            <Button containerStyle={[styles.submitButton]}
                                title="注册"
                                onPress={this.submit}
                            />
                        </View>
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default Signup;
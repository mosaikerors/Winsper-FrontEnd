import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import agent from "../../agent"

const requests = require('superagent');

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    attendance: {
        marginTop: 46,
        marginRight: 34,
        //width: 70,
        height: 40
    },
    checked: {
        width: 90
    },
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
                <View style={{ alignItems: 'center' }}>
                    <Card title="注册">
                        <View style={{ flexDirection: 'row' }}>
                            <Text>手机号</Text>
                            <TextInput style={{ width: 300, borderWidth: 1 }} onChangeText={text => this.updateState('phone', text)} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>验证码</Text>
                            <TextInput style={{ width: 200, borderWidth: 1 }} onChangeText={text => this.updateState('code', text)} />
                            <Button title="获取验证码" onPress={this.sendCode} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>用户名</Text>
                            <TextInput style={{ width: 300, borderWidth: 1 }} onChangeText={text => this.updateState('username', text)} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>密码</Text>
                            <TextInput style={{ width: 300, borderWidth: 1 }} onChangeText={text => this.updateState('password', text)} />
                        </View>
                        <Button containerStyle={[styles.attendance, styles.checked]}
                            title="注册"
                            onPress={this.submit}
                        />
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default Signup;
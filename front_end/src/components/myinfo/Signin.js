import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import agent from "../../agent/index"
import Icon from "react-native-vector-icons/FontAwesome"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    inputContainer: {
        width: '88%',
    },
    input: {
        borderRadius: 50,
        borderWidth: 2,
        borderBottomWidth: 2,
        margin: 12,
    },
    submitButton: {
        width: 90,
        height: 50,
        marginTop: 20,
        borderRadius: 50,
    },
});

const login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedIn' })
    ]
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (response) =>
        dispatch({ type: 'SIGN_IN', payload: response }),
    onReceiveMessage: (message) =>
        dispatch({ type: "RECEIVE_MESSAGE", payload: message })
});

export class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            rescode: -1
        };
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { phone, password } = this.state;
        const response = await agent.user.firstSignin(phone, password);
        if (response.rescode === 0) {
            // for test
            this.setState({ rescode: 0 });
            // 这两行代码位置不能对调，因为要先改 Redux store 再跳转页面，这样在 loggedIn 的 willMount钩子中才能获取到更改后的 stored
            // 注：这里没有经过中间件的 dispatch 看上去是同步的
            this.props.onSubmit(response)
            this.props.navigation.dispatch(login);
            // websocket
            agent.ws1 = new WebSocket("ws://202.120.40.8:30525/websocket?senderUId=1");
            
            agent.ws1.onopen = function () {
                console.log('open1');
            };
            agent.ws1.onmessage = (e) => {
                const message = eval("(" + e.data + ")");
                console.log("ws1: " + message.senderUsername); 
                agent.ws.send('{ "type": 1, "receiverUId": 2, "senderUsername": "B" }');
            };
            agent.ws1.onclose = function () {
                console.log('close1');
            };

            agent.ws = new WebSocket("ws://202.120.40.8:30525/websocket?senderUId=2");
            agent.ws.onopen = function () {
                console.log('open2');
            };
            agent.ws.onmessage = (e) => {
                const message = eval("(" + e.data + ")");
                console.log("ws2: "+message.senderUsername);
                this.props.onReceiveMessage(message)
            };
            agent.ws.onclose = function () {
                console.log('close2');
            };
        }
    }

    updateState(field, text) {
        this.setState({
            [field]: text
        });
    }

    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: -10 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 2 }}>
                            登录
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="手机号"
                            leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            value={this.state.phone}
                            onChangeText={text => this.updateState('phone', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            textContentType="password"
                            placeholder="密码"
                            leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            value={this.state.password}
                            onChangeText={text => this.updateState('password', text)}
                            secureTextEntry
                        />
                    </View>
                    <Button
                        title="登录"
                        onPress={this.submit}
                        buttonStyle={styles.submitButton}
                        titleStyle={{ fontSize: 20 }}
                    />
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
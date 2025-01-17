import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from 'react-native-elements'
import agent from "../../agent/index"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { connect } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';
import { StackActions, NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    sendCodeButton: {
        width: 120,
        height: 54,
        borderRadius: 50,
        marginRight: 12
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
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (token) =>
        dispatch({ type: 'UPDATE_TOKEN', payload: { token } }),
    onSignIn: (response) =>
        dispatch({ type: 'SIGN_IN', payload: response }),
    onReceiveMessage: () =>
        dispatch({ type: "RECEIVE_MESSAGE" })
})

const getAlertTitle = alertType => {
    if (alertType === 1)
        return "修改成功"
    if (alertType === 2)
        return "该手机号尚未注册"
    if (alertType === 3)
        return "Oops... 发生了一个预期外的错误"
}

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            phone: '',
            code: '',
            password: '',
            sendCodeButton: { clickable: true, timeToClick: 0 },
            alertType: 0  // 0: hidden, 1: modifyOK, 2: phone doesn't existed, 3: unexpected error
        };

        setInterval(() => this.updateSendCodeButton(), 1000);

        this.updateState = this.updateState.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.submit = this.submit.bind(this);
        this.updateSendCodeButton = this.updateSendCodeButton.bind(this);
        this.handleComfirmPressed = this.handleComfirmPressed.bind(this);
    }

    updateSendCodeButton() {
        if (this.state.sendCodeButton.timeToClick === 1)
            this.setState({
                sendCodeButton: {
                    clickable: true,
                    timeToClick: 0
                }
            });
        else this.setState(prevState => ({
            sendCodeButton: {
                clickable: prevState.sendCodeButton.clickable,
                timeToClick: prevState.sendCodeButton.timeToClick - 1
            }
        }));
    }

    async sendCode() {
        const response = await agent.user.sendCodeWhenForget(this.state.phone);
        if (response.rescode === 0) {
            this.setState({
                token: response.token,
                sendCodeButton: {
                    clickable: false,
                    timeToClick: 60,  //can send code only once for each minute
                }
            });
        }
        else if (response.rescode === 3)
            this.setState({ alertType: 2 })
        else
            this.setState({ alertType: 3 })
    }

    async submit() {
        const { token, phone, code, password } = this.state;
        const response = await agent.user.modifyPasswordWhenForget(token, phone, code, password);
        if (response.rescode === 0) {
            this.setState({ alertType: 1 });
            this.props.onSubmit(response.token)
        }
    }

    updateState(field, text) {
        this.setState({
            [field]: text
        });
    }

    async handleComfirmPressed() {
        const { alertType, phone, password } = this.state;
        if (alertType > 1) {
            this.setState({ alertType: 0 })
            return;
        }
        const response = await agent.user.firstSignin(phone, password);
        this.props.onSignIn(response)
        this.props.navigation.dispatch(login);
        agent.ws = new WebSocket(`ws://202.120.40.8:30525/websocket?senderUId=${response.uId}`);
        agent.ws.onopen = function () {
            console.log('open');
        };
        agent.ws.onmessage = (e) => {
            const message = eval("(" + e.data + ")");
            console.log("ws: " + message);
            this.props.onReceiveMessage()
        };
        agent.ws.onclose = function () {
            console.log('close');
        };
    }

    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: -10 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 2 }}>
                            忘记密码
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="手机号"
                            leftIcon={<FontAwesome name="phone" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            onChangeText={text => this.updateState('phone', text)}
                        />
                    </View>
                    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                        <View style={{ width: '65%' }}>
                            <Input
                                placeholder="验证码"
                                leftIcon={<MaterialIcons name="verified-user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                                inputContainerStyle={[styles.input, { marginRight: 8 }]}
                                onChangeText={text => this.updateState('code', text)}
                            />
                        </View>
                        <View style={{ width: "35%", justifyContent: "center" }}>
                            {this.state.sendCodeButton.clickable ?
                                <Button
                                    title="获取验证码"
                                    onPress={this.sendCode}
                                    buttonStyle={styles.sendCodeButton}
                                    titleStyle={{ fontSize: 18 }}
                                /> :
                                <Button
                                    title={`已发送(${this.state.sendCodeButton.timeToClick})`}
                                    buttonStyle={styles.sendCodeButton}
                                    titleStyle={{ fontSize: 18 }}
                                    disabled
                                />
                            }
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="密码"
                            leftIcon={<FontAwesome name="shield" size={18} style={{ marginRight: 10, marginLeft: 10 }} />}
                            inputContainerStyle={styles.input}
                            onChangeText={text => this.updateState('password', text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Button
                            title="确认"
                            buttonStyle={styles.submitButton}
                            titleStyle={{ fontSize: 20 }}
                            onPress={this.submit}
                        />
                    </View>
                </View>
                <AwesomeAlert
                    show={this.state.alertType > 0}
                    title={getAlertTitle(this.state.alertType)}
                    showConfirmButton={true}
                    confirmText="确认"
                    onConfirmPressed={this.handleComfirmPressed}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
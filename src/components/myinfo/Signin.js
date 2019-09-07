import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import agent from "../../agent/index"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AwesomeAlert from 'react-native-awesome-alerts';

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
    onReceiveMessage: () =>
        dispatch({ type: "RECEIVE_MESSAGE" })
});

const getAlertTitle = alertType => {
    if (alertType === 1)
        return "该用户已被禁用"
    if (alertType === 2)
        return "手机号或密码不正确"
    if (alertType === 3)
        return "Oops... 发生了一个预期外的错误"
}

export class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            rescode: -1,
            alertType: 0  // 0: hidden, 1: banned user, 2: wrong phone or password, 3: unexpected error
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
        else if (response.rescoed === 3)
            this.setState({ alertType: 1 })
        else if (response.rescoed === 4)
            this.setState({ alertType: 2 })
        else
            this.setState({ alertType: 3 })
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
                            leftIcon={<FontAwesome name="phone" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            value={this.state.phone}
                            onChangeText={text => this.updateState('phone', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            textContentType="password"
                            placeholder="密码"
                            leftIcon={<FontAwesome name="shield" size={18} style={{ marginRight: 10, marginLeft: 8 }} />}
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
                <AwesomeAlert
                    show={this.state.alertType > 0}
                    title={getAlertTitle(this.state.alertType)}
                    showConfirmButton={true}
                    confirmText="确认"
                    onConfirmPressed={() => this.setState({ alertType: 0 })}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
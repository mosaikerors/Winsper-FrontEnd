import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from 'react-native-elements'
import agent from "../../agent/index"
import Icon from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux";

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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (token) => 
        dispatch({type: 'UPDATE_TOKEN',payload:{token}})
})

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            phone: '',
            code: '',
            password: '',
            sendCodeButton: { clickable: true, timeToClick: 0 },
            modifyOK: false,
        };

        setInterval(() => this.updateSendCodeButton(), 1000);

        this.updateState = this.updateState.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.submit = this.submit.bind(this);
        this.updateSendCodeButton = this.updateSendCodeButton.bind(this);
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
                    timeToClick: 5,  //can send code only once for each minute
                }
            });
        }
    }

    async submit() {
        const { token, phone, code, password } = this.state;
        const response = await agent.user.modifyPasswordWhenForget(token, phone, code, password);
        if (response.rescode === 0) {
            this.setState({
                modifyOK: true
            });
            this.props.onSubmit(response.token)
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
                            忘记密码
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="手机号"
                            leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            onChangeText={text => this.updateState('phone', text)}
                        />
                    </View>
                    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                        <View style={{ width: '65%' }}>
                            <Input
                                placeholder="验证码"
                                leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
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
                            leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            onChangeText={text => this.updateState('password', text)}
                            secureTextEntry
                        />
                    </View>
                    {this.state.modifyOK ? (
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Button
                                icon={<Icon name="check" size={15} color="white" style={{ margin: 5 }} />}
                                title="修改成功"
                                backgroundColor="#00e676"
                                buttonStyle={[styles.submitButton, { width: 120, backgroundColor: "#64dd17" }]}
                                titleStyle={{ fontSize: 20 }}
                            />
                        </View>
                    ) : (
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Button
                                    title="确认"
                                    buttonStyle={styles.submitButton}
                                    titleStyle={{ fontSize: 20 }}
                                    onPress={this.submit}
                                />
                            </View>
                        )
                    }
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
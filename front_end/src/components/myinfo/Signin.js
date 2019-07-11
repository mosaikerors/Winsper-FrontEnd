import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card, Input } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import agent from "../../agent"
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
})

const login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedIn' })
    ]
});

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (token, uId, username, status) =>
        dispatch({ type: 'SIGN_IN', payload: { token, uId, username, status } }),
    onLoadHeans: (heans) => {
        /*console.log("*************************response**********************")
        console.log(response);*/
        console.log("*************************heans**********************")
        console.log(heans);
        return dispatch({ type: "LOAD_ALL_HEANS", payload: heans })
    }
})

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            phone: '',
            password: '',
        }
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { phone, password } = this.state;
        const { uId, token } = this.props;
        try {
            const response = await agent.user.firstSignin(phone, password);
            console.log(response);
            if (/*response.hasOwnProperty("message") && */response.message === "ok") {
                this.props.navigation.dispatch(login)
                this.props.onSubmit(response.token, response.uId, response.username, response.status)
                try {
                    const heanResp = await agent.hean.getAll(uId, token);
                    console.log("***********heanResp*************")
                    console.log(heanResp)
                    this.props.onLoadHeans(heanResp.heanArray);
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        catch (error) {
            console.log(error)
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

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 10 }}>
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
                            onChangeText={text => this.updateState('phone', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="密码"
                            leftIcon={<Icon name="user" size={18} style={{ marginRight: 8, marginLeft: 6 }} />}
                            inputContainerStyle={styles.input}
                            onChangeText={text => this.updateState('password', text)}
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
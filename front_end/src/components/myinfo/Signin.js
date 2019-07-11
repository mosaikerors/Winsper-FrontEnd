import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
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
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Card title="登录" containerStyle={{ marginBottom: 70 }}>
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
                                <Text>密码</Text>
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <TextInput style={styles.input} onChangeText={text => this.updateState('password', text)} />
                            </View>
                        </View>
                        <View style={styles.submitButtonContainer}>
                            <Button containerStyle={[styles.submitButton]}
                                title="登录"
                                onPress={this.submit}
                            />
                        </View>
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
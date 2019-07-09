import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";

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

const login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedIn' })
    ]
});

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    onSubmit: (token, uId, username, status) =>
        dispatch({ type: 'SIGN_IN', payload: { token, uId, username, status } })
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
        const response = await agent.user.firstSignin(phone, password);
        console.log(response);
        if (/*response.hasOwnProperty("message") && */response.message === "ok") {
            this.props.navigation.dispatch(login)
            this.props.onSubmit(response.token, response.uId, response.username, response.status)
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
                <View style={{ alignItems: 'center' }}>
                    <Card title="登录">
                        <View style={{ flexDirection: 'row' }}>
                            <Text>手机号</Text>
                            <TextInput style={{ width: 300, borderWidth: 1 }} onChangeText={text => this.updateState('phone', text)} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>密码</Text>
                            <TextInput style={{ width: 300, borderWidth: 1 }} onChangeText={text => this.updateState('password', text)} />
                        </View>
                        <Button containerStyle={[styles.attendance, styles.checked]}
                            title="登录"
                            onPress={this.submit/*() => this.props.navigation.dispatch(login)*/}
                        />
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
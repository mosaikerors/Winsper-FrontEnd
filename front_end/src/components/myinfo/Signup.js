import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'

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
    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center' }}>
                    <Card title="注册">
                        <View style={{ flexDirection: 'row' }}>
                            <Text>手机号</Text>
                            <TextInput style={{ width: 300, borderWidth:1 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>验证码</Text>
                            <TextInput style={{ width: 200, borderWidth:1 }} />
                            <Button title="获取验证码" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>用户名</Text>
                            <TextInput style={{ width: 300, borderWidth:1 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>密码</Text>
                            <TextInput style={{ width: 300, borderWidth:1 }} />
                        </View>
                        <Button containerStyle={[styles.attendance, styles.checked]}
                            title="注册"
                            onPress={() => this.props.navigation.dispatch(login)}
                        />
                    </Card>
                </View>
            </React.Fragment>
        );
    }
}
export default Signup;
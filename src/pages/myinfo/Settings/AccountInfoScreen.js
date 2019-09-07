import React from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, CameraRoll } from "react-native";
import { Button, Avatar, Divider, Card, Input } from 'react-native-elements'
import agent from "../../../agent/index";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign"
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-crop-picker';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "../../../config"
import AwesomeAlert from 'react-native-awesome-alerts';
import theme from "../../../theme"

const titles = ['修改用户名', '修改头像', '修改密码'];
const requests = require('superagent');

const getNullAlert = nullAlert => {
    if (nullAlert === 1)
        return "用户名不能为空";
    if (nullAlert === 2)
        return "头像不能为空";
    if (nullAlert === 3)
        return "密码不能为空";
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 50,
        borderWidth: 2,
        borderBottomWidth: 2,
        margin: 12,
        height: 40,
        paddingLeft: 10
    },
    submitButton: {
        width: 80,
        height: 40,
        borderRadius: 40,
        backgroundColor: theme.palette.sky[2]
    },
})

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (token) =>
        dispatch({ type: 'UPDATE_TOKEN', payload: { token } })
})

class AccountInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            avatarUrl: null,
            password: '',
            activeSections: [],
            avatarData: null,
            avatarMime: null,
            showAlert: false,
            nullAlert: 0,
        }
        this.submitUsername = this.submitUsername.bind(this);
        this.submitAvatar = this.submitAvatar.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.pickAvatar = this.pickAvatar.bind(this);
    }

    async submitUsername() {
        const { uId, token } = this.props;
        if (this.state.username === '') {
            this.setState({ nullAlert: 1 })
            return;
        }
        const response = await agent.user.updateUsername(uId, token, this.state.username)
        this.setState({ activeSections: [], showAlert: true, username: '' })
    }

    async submitAvatar() {
        const { uId, token } = this.props;
        if (!this.state.avatarUrl) {
            this.setState({ nullAlert: 2 })
            return;
        }
        const response = await agent.user.updateAvatar(uId, token, this.state.avatarUrl);
        this.setState({ activeSections: [], showAlert: true, avatarUrl: null, avatarData: null, avatarMime: null })
    }

    async submitPassword() {
        const { uId, token } = this.props;
        if (this.state.password === '') {
            this.setState({ nullAlert: 3 })
            return;
        }
        const response = await agent.user.modifyPassword(uId, token, this.state.password)
        if (response.rescode === 0) {
            this.props.onSubmit(response.token)
            this.setState({ activeSections: [], showAlert: true, password: '' })
        }
    }

    async pickAvatar() {
        const avatarUrl = await ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true
        }).then(async image => {
            this.setState({ avatarData: image.data, avatarMime: image.mime })
            // base64 格式的图片 上传至 Cloudinary
            const url = await requests.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', `data:${image.mime};base64,${image.data}`)
                .then(res => res.body.secure_url)
                .catch(err => console.log(err.response.xhr))
            return url;
        });
        this.setState({ avatarUrl })
    };


    renderHeader = title => {
        return (
            <View style={{ borderWidth: 0, height: 50, width: "100%", flexDirection: "row", backgroundColor: theme.palette.sky[0] }}>
                <Text style={{ alignSelf: "center", marginLeft: 15, flex: 1, fontSize: 16 }}>
                    {title}
                </Text>
                <FontAwesome style={{ alignSelf: "center", marginRight: 15 }} name={"chevron-down"} size={14} />
            </View>
        );
    };

    renderContent = section => {
        if (this.state.activeSections[0] === 0)  // update username
            return (
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, height: 150, alignItems: "center" }}>
                    <Divider />
                    <View style={{ flex: 6, flexDirection: "row", width: "65%" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 20 }}>新用户名</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Input
                                inputContainerStyle={styles.input}
                                value={this.state.username}
                                onChangeText={username => this.setState({ username })}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Button
                            title="确认"
                            onPress={this.submitUsername}
                            buttonStyle={styles.submitButton}
                            titleStyle={{ fontSize: 20 }}
                        />
                    </View>
                    <Divider />
                </View>
            );
        if (this.state.activeSections[0] === 1)  // update avatar
            return (
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, height: 200, alignItems: "center" }}>
                    <Divider />
                    <View style={{ flex: 7, borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                        {this.state.avatarData ?
                            <Avatar
                                rounded
                                source={{ uri: this.state.avatarUrl }}
                                size={120}
                            />
                            :
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1, width: 120, height: 120, borderRadius: 60,
                                    justifyContent: "center", alignItems: "center"
                                }}
                                onPress={this.pickAvatar}
                            >
                                <AntDesign name={"plus"} size={36} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ flex: 3, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Button
                            title="确认"
                            onPress={this.submitAvatar}
                            buttonStyle={styles.submitButton}
                            titleStyle={{ fontSize: 20 }}
                        />
                    </View>
                    <Divider />
                </View>
            );
        if (this.state.activeSections[0] === 2)  // update password
            return (
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, height: 150, alignItems: "center" }}>
                    <Divider />
                    <View style={{ flex: 6, flexDirection: "row", width: "65%" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 20 }}>新密码</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Input
                                textContentType="password"
                                inputContainerStyle={styles.input}
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Button
                            title="确认"
                            onPress={this.submitPassword}
                            buttonStyle={styles.submitButton}
                            titleStyle={{ fontSize: 20 }}
                        />
                    </View>
                    <Divider />
                </View>
            );
    };

    render() {
        return (
            <React.Fragment>
                <View style={{ flex: 1, backgroundColor: theme.palette.sky[0] }}>
                    <Accordion
                        sections={titles}
                        underlayColor={theme.palette.sky[0]}
                        activeSections={this.state.activeSections}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        onChange={activeSections => this.setState({ activeSections })}
                    />
                    <AwesomeAlert
                        show={this.state.showAlert}
                        title="修改成功"
                        showConfirmButton={true}
                        confirmText="确认"
                        onConfirmPressed={() => this.setState({ showAlert: false })}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                    />
                    <AwesomeAlert
                        show={this.state.nullAlert > 0}
                        title={getNullAlert(this.state.nullAlert)}
                        showConfirmButton={true}
                        confirmText="好"
                        onConfirmPressed={() => this.setState({ nullAlert: 0 })}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                    />
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoScreen);
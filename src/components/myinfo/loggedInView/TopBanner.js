import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from 'react-native-elements'
import agent from "../../../agent/index"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import theme from "../../../theme"

const styles = StyleSheet.create({
    username: {
        marginTop: 22,
        marginLeft: 8,
        padding: 10,
        paddingBottom: 6,
        fontSize: 24,
        fontWeight: 'bold',
        borderStyle: 'solid',
    },
    feather: {
        marginLeft: 12,
        padding: 10,
        paddingTop: 6,
    },
    attendance: {
        marginTop: 46,
        marginRight: 34,
        height: 40,
        //backgroundColor:theme.palette.sky[2]
    },
    checked: {
        width: 90,
    },
    unchecked: {
        width: 70
    }
});

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
    myUsername: state.user.username,
});

const mapDispatchToProps = dispatch => ({
    onCheck: (feather) =>
        dispatch({ type: 'UPDATE_FEATHER', payload: { feather } })
});

class TopBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feather: this.props.feather,
            hasChecked: this.props.hasChecked,
            hasFollowed: this.props.hasFollowed,
        }
        this.check = this.check.bind(this);
        this.toggleFollow = this.toggleFollow.bind(this);
    }

    // 一个正确的 superagent + Redux 联动流程：await agent -> dispatch action -> Redux store changed -> rerender
    // 现在莫得了 因为把那么多状态都放在 Redux store 好像没啥必要
    async check() {
        const { uId, token } = this.props;
        const response = await agent.user.check(uId, token);
        if (response.rescode === 0) {
            this.setState({ feather: response.newFeather, hasChecked: true })
            this.props.onCheck(response.newFeather)
        }
    }

    async toggleFollow() {
        const { uId, token, otherUId, myUsername } = this.props;
        const { hasFollowed } = this.state;
        if (!hasFollowed)
            agent.ws.send(`{ "type": 1, "receiverUId": ${otherUId}, "senderUsername": "${myUsername}" }`);
        const response = hasFollowed ? await agent.user.unfollow(uId, token, otherUId) : await agent.user.follow(uId, token, otherUId);
        if (response.rescode === 0)
            this.setState({ hasFollowed: !hasFollowed })
    }

    render() {
        const { username, avatar, isMe } = this.props;
        const { feather, hasChecked, hasFollowed } = this.state;
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", paddingBottom: 12, backgroundColor: theme.palette.sky[0] }}>
                    {avatar !== "" ?
                        <Avatar
                            rounded
                            size="large"
                            source={{ uri: avatar }}
                            overlayContainerStyle={{ backgroundColor: 'white', flex: 4, borderWidth: 1 }}
                            activeOpacity={0.7}
                            containerStyle={{ marginTop: 25, marginLeft: 25, borderWidth: 1 }}
                        />
                        :
                        <Avatar
                            rounded
                            size="large"
                            source={require("../../../../images/defaultAvatar.jpg")}
                            overlayContainerStyle={{ backgroundColor: 'white', flex: 4, borderWidth: 1 }}
                            activeOpacity={0.7}
                            containerStyle={{ marginTop: 25, marginLeft: 25, borderWidth: 1 }}
                        />
                    }
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={[styles.username, styles.border]}
                        >
                            {username}
                        </Text>
                        <Text
                            style={[styles.feather, styles.border]}
                        >
                            羽毛：{feather}
                        </Text>
                    </View>
                    {isMe ? (
                        <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                            {hasChecked ? (
                                <Button
                                    containerStyle={[styles.attendance, styles.border, styles.checked]}
                                    title="已签到"
                                    disabled
                                    icon={{ name: "check", color: theme.palette.sky[2] }}
                                />
                            ) : (
                                    <Button containerStyle={[styles.attendance, styles.border, styles.unchecked]}
                                        title="签到"
                                        buttonStyle={{ backgroundColor: theme.palette.sky[2] }}
                                        onPress={this.check}
                                    />
                                )
                            }
                        </View>
                    ) : (
                            <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                                {hasFollowed ? (
                                    <Button
                                        containerStyle={[styles.attendance, styles.border, styles.checked]}
                                        buttonStyle={{ backgroundColor: theme.palette.sky[2] }}
                                        title="已关注"
                                        onPress={this.toggleFollow}
                                        icon={{ name: "check", color: "white" }}
                                    />
                                ) : (
                                        <Button
                                            containerStyle={[styles.attendance, styles.border, styles.unchecked]}
                                            buttonStyle={{ backgroundColor: theme.palette.sky[2] }}
                                            title="关注"
                                            onPress={this.toggleFollow}
                                        />
                                    )
                                }
                            </View>
                        )}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);
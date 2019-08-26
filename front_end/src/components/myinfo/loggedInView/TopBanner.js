import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from 'react-native-elements'
import agent from "../../../agent/index"
import { connect } from "react-redux"

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
        height: 40
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
});

const mapDispatchToProps = dispatch => ({
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
        }
    }

    async toggleFollow() {
        const { uId, token, otherUId } = this.props;
        const { hasFollowed } = this.state;
        const response = hasFollowed ? await agent.user.unfollow(uId, token, otherUId) : await agent.user.follow(uId, token, otherUId);
        if (response.rescode === 0)
            this.setState({ hasFollowed: !hasFollowed })
    }

    render() {
        const { username, avatar, isMe } = this.props;
        const { feather, hasChecked, hasFollowed } = this.state;
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <Avatar
                        rounded
                        size="large"
                        icon={{ name: 'user', color: 'orange', type: 'font-awesome' }}
                        overlayContainerStyle={{ backgroundColor: 'cyan', flex: 4, borderWidth: 1 }}
                        activeOpacity={0.7}
                        containerStyle={{ marginTop: 25, marginLeft: 25, borderWidth: 1 }}
                        showEditButton
                    />
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
                                    icon={{ name: "check" }}
                                />
                            ) : (
                                    <Button containerStyle={[styles.attendance, styles.border, styles.unchecked]}
                                        title="签到"
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
                                        title="已关注"
                                        onPress={this.toggleFollow}
                                        icon={{ name: "check" }}
                                    />
                                ) : (
                                        <Button containerStyle={[styles.attendance, styles.border, styles.unchecked]}
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
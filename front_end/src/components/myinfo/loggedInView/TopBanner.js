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
            avatar: this.props.avatar,
            username: this.props.username,
            feather: this.props.feather,
            hasChecked: this.props.hasChecked,
        }
        this.check = this.check.bind(this);
    }

    // 一个正确的 superagent + Redux 联动流程：await agent -> dispatch action -> Redux store changed -> rerender
    // 现在莫得了 因为把那么多状态都放在 Redux store 好像没啥必要
    async check() {
        const { uId, token } = this.props;
        const response = await agent.user.check(uId, token);
        if (response.rescode === 0) {
            this.setState({ feather: response.newFeather })
        }
    }

    render() {
        const { avatar, username, feather, hasChecked } = this.state;
        const { isMe } = this.props;
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
                    {isMe && (
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
                    )}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from 'react-native-elements'
import agent from "../../agent"
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
    username: state.user.username,
    feather: state.user.feather,
    hasChecked: state.user.hasChecked,
});

const mapDispatchToProps = dispatch => ({
    onCheck: (newFeather) =>
        dispatch({ type: 'CHECK', payload: { newFeather } })
});

class TopBanner extends React.Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
    }

    async check() {
        const { uId, token } = this.props;
        const response = await agent.user.check(uId, token);
        if (response.message === 'ok') {
            this.props.onCheck(response.newFeather);
        }
    }

    render() {
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
                            {this.props.username}
                        </Text>
                        <Text
                            style={[styles.feather, styles.border]}
                        >
                            羽毛：{this.props.feather}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                        {this.props.hasChecked ? (
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
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);
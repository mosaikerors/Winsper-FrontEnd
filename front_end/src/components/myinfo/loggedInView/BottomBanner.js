import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Overlay } from 'react-native-elements';
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import theme from "../../../theme"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        width: 60,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    logout: {
        marginRight: 10,
    }
});

const logout = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoggedOut' })
    ]
});

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    onLoggedOut: () =>
        dispatch({ type: 'LOGGED_OUT' })
})

class BottomBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showThemeSelector: false,
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.onLoggedOut();
        this.props.navigation.dispatch(logout)
    }

    render() {
        const { showThemeSelector } = this.state;
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: 'column-reverse', backgroundColor: theme.palette.sky[0] }}>
                    <View style={{ height: 40, flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.block}>
                                <TouchableOpacity style={[styles.text, { borderWidth: 0 }]} onPress={() => this.props.navigation.navigate('Settings')}>
                                    <FontAwesome name="gear" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.block}>
                                <TouchableOpacity style={styles.text} onPress={() => this.setState({ showThemeSelector: true })}>
                                    <FontAwesome5 name="tshirt" size={17} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                            <TouchableOpacity style={[styles.text, styles.logout]} onPress={this.logout}>
                                <Text>退出登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider />
                </View>
                <Overlay overlayBackgroundColor="white" isVisible={showThemeSelector}
                    overlayStyle={{ opacity: 0.8, height: 350, width: 300 }}
                >
                    <View style={{}}>
                        <Text style={{ fontSize: 28, alignSelf: "center", marginBottom: 5 }}>选择主题</Text>
                    </View>
                    <Divider style={{ marginBottom: 10 }} />
                    <View style={{ flexDirection: "row", borderWidth: 0, flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ borderWidth: 0, width: 100, height: 100 }}
                                onPress={() => this.setState({ showThemeSelector: false })}
                            >
                                <LinearGradient colors={[theme.palette.sky[0], theme.palette.sky[1], theme.palette.sky[2]]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={{ flex: 1 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginTop: 5 }}>天空</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ borderWidth: 0, width: 100, height: 100 }}
                                onPress={() => this.setState({ showThemeSelector: false })}
                            >
                                <LinearGradient colors={[theme.palette.lavender[0], theme.palette.lavender[1], theme.palette.lavender[2]]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={{ flex: 1 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginTop: 5 }}>薰衣草</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, borderWidth: 0, marginTop: 0 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ borderWidth: 0, width: 100, height: 100 }}
                                onPress={() => this.setState({ showThemeSelector: false })}
                            >
                                <LinearGradient colors={[theme.palette.forest[0], theme.palette.forest[1], theme.palette.forest[2]]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={{ flex: 1 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginTop: 5 }}>森林</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ borderWidth: 0, width: 100, height: 100 }}
                                onPress={() => this.setState({ showThemeSelector: false })}
                            >
                                <LinearGradient colors={[theme.palette.desert[0], theme.palette.desert[1], theme.palette.desert[2]]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={{ flex: 1 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginTop: 5 }}>沙漠</Text>
                        </View>
                    </View>
                </Overlay>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomBanner);
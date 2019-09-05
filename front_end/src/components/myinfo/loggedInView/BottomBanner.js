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
                                    <Text>设置</Text>
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
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomBanner);
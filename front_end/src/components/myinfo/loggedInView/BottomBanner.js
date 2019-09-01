import React from "react";
import { Text, View, StyleSheet,TouchableOpacity} from "react-native";
import { Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from "react-navigation";

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

class BottomBanner extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <View style={{ height: 40, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.block}>
                                <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Settings')}>
                                    <Text>设置</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                            <TouchableOpacity style={[styles.text, styles.logout]} onPress={() => this.props.navigation.dispatch(logout)}>
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
export default BottomBanner;
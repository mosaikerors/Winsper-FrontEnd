import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class BottomBanner extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <View style={{ height: 40, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={styles.block}><Text>设置</Text></View>
                            <View style={styles.block}><Text>夜间</Text></View>
                            <View style={styles.block}><Text>东19</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                            <View style={[ styles.block ,{marginRight:10}]}><Text>退出登录</Text></View>
                        </View>
                    </View>
                    <Divider />
                </View>
            </React.Fragment>
        );
    }
}
export default BottomBanner;
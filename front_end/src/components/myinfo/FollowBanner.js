import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        //borderColor: "#bbdefb"
    }
})

class FollowBanner extends React.Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.block}>
                        <Text>1</Text>
                        <Text>互相关注</Text>
                    </View>
                    <View style={styles.block}>
                        <Text>1</Text>
                        <Text>关注</Text>
                    </View>
                    <View style={styles.block}>
                        <Text>1</Text>
                        <Text>粉丝</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default FollowBanner;
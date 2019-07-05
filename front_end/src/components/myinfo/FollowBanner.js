import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        height: 80,
        //flexDirection: 'column'
        //borderWidth: 1,
        //borderColor: "#bbdefb"
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

class FollowBanner extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text}>
                            <Text>1</Text>
                            <Text>互相关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={()=>this.props.navigation.navigate('Following')}>
                            <Text>1</Text>
                            <Text>关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text}>
                            <Text>1</Text>
                            <Text>粉丝</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment >
        );
    }
}
export default FollowBanner;
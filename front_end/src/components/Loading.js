import React from 'react'
import { Text, ActivityIndicator,View } from 'react-native'

class Loading extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center', padding:10 }}>
                    <ActivityIndicator size={60} color="blue" />
                    <Text style={{ marginTop: 10, color: "blue", fontSize: 24 }}>正在加载...</Text>
                </View>
            </React.Fragment>
        )
    }
}
export default Loading;
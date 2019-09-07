import React from 'react'
import { Text, ActivityIndicator, View } from 'react-native'
import theme from "../theme"

class Loading extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center', padding: 10, backgroundColor: theme.palette.sky[0], flex: 1 }}>
                    <ActivityIndicator size={60} color={theme.palette.sky[2]} />
                    <Text style={{ marginTop: 10, color: theme.palette.sky[2], fontSize: 24 }}>正在加载...</Text>
                </View>
            </React.Fragment>
        )
    }
}
export default Loading;
import React from 'react'
import { Text, ActivityIndicator, View, Image } from 'react-native'
import theme from "../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class EmptyList extends React.Component {
    render() {
        const { field } = this.props
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center',padding:10,backgroundColor: theme.palette.sky[0],flex:1 }}>
                    <FontAwesome name={"frown-o"} size={60} color={theme.palette.sky[1]} />
                    <Text style={{ marginTop: 10, fontSize: 20, color: theme.palette.sky[2] }}>{`${field}里什么也没有`}</Text>
                </View>
            </React.Fragment>
        )
    }
}
export default EmptyList;
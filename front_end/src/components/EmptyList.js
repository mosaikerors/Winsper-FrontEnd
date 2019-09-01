import React from 'react'
import { Text, ActivityIndicator, View, Image } from 'react-native'

class EmptyList extends React.Component {
    render() {
        const { field } = this.props
        return (
            <React.Fragment>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ borderWidth: 0, marginTop: 15 }}>
                        <Image source={require('../../images/empty.png')} style={{ height: 200, width: 200 }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 20, color: "grey" }}>{`${field}里什么也没有`}</Text>
                </View>
            </React.Fragment>
        )
    }
}
export default EmptyList;
import React from 'react'
import { View, Text, Image, CameraRoll, ART } from "react-native"
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Button } from 'react-native-elements';
const requests = require('superagent');

export default class Root extends React.Component {
    render() {
        return (
            <View>
                <Text>123</Text>
                <View style={{marginLeft:10}}>
                    <View style={{ height: 20, width: 20, borderLeftWidth: 1, borderTopWidth: 1, zIndex: 2, position: "relative", top: 24, transform: [{ rotate: "45deg" }] }} />
                    <View style={{ height: 60, width: 0, position: "relative", left: 10, borderLeftWidth: 1, zIndex: 1 }} />
                    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, backgroundColor: "cyan" }} />
                    <View style={{ height: 80, width: 0, position: "relative", left: 10, borderLeftWidth: 1 }} />
                    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, backgroundColor: "cyan" }} />
                </View>
            </View>
        )
    }
}
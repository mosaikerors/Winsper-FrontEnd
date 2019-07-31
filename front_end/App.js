import React from 'react'
import { View, Text, Image, CameraRoll, ART } from "react-native"
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Button } from 'react-native-elements';
import Carousel from "react-native-snap-carousel"

const requests = require('superagent');

export default class Root extends React.Component {
    render() {
        return (
            <View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={[1, 2, 3]}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Text>{item}</Text>
                            </View>
                        )
                    }}
                    sliderWidth={50}
                    itemWidth={50}
                />
            </View>
        )
    }
}
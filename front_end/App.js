import React from 'react';
import { Button, View, Text, PanResponder, Animated, TouchableOpacity, Image } from 'react-native';
import Sticker from './src/components/journal/sticker';

const icon4 = require("./images/sticker/icon4.png")
const icon5 = require("./images/sticker/icon5.png")
const icon6 = require("./images/sticker/icon6.png")

class D extends React.Component {

    render() {
        const info4 = Image.resolveAssetSource(icon4)
        const info5 = Image.resolveAssetSource(icon5)
        return (
            <React.Fragment>
                <Sticker width={info4.width} height={info4.height} source={icon4} />
                <Sticker width={info5.width} height={info5.height} source={icon5} />
                <Sticker width={info5.width} height={info5.height} text="12345" />
                {/*<Image source={icon6} style={{ position: "absolute", top: 100, left: 100,transform:[{scale:2}] }} />*/}
            </React.Fragment>
        )
    }
}

export default D;
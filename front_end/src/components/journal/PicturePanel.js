import React from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Button, Divider } from "react-native-elements"
import Drawer from "react-native-drawer"
import Sticker from "./Sticker"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";

const icon4 = require("../../../images/sticker/icon4.png")
const icon5 = require("../../../images/sticker/icon5.png")
const icon6 = require("../../../images/sticker/icon6.png")

const getScale = ({ width, height }) => {
    const maxSize = width > height ? width : height;
    return 70 / maxSize
}

const styles = StyleSheet.create({
    stage: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
        borderWidth: 1
    },
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    controlPanel: {
        flex: 1,
        backgroundColor: 'pink',
    },
    controlPanelWelcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});

const bi1 = require("../../../images/p1.jpg")
const bi2 = require("../../../images/p2.jpg")
const bi3 = require("../../../images/p5.jpg")

class PicturePanel extends React.Component {
    render() {
        return (
            <View style={styles.controlPanel}>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{}}>
                    <ScrollView tabLabel="贴纸">
                        <View style={{ justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity onPress={() => this.props.addSticker(1)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(2)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(3)} >
                                    <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(4)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(5)} >
                                    <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity onPress={() => this.props.addSticker(6)} >
                                    <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(7)} >
                                    <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(8)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(9)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(10)} >
                                    <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity onPress={() => this.props.addSticker(11)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(12)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(13)} >
                                    <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(14)} >
                                    <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.addSticker(15)} >
                                    <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    <View tabLabel="背景" style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.changeBackground(bi1)}>
                            <Image source={bi1} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.changeBackground(bi2)}>
                            <Image source={bi2} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.changeBackground(bi3)}>
                            <Image source={bi3} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

export default PicturePanel;
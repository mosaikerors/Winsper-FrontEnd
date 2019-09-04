import React from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import stickers from "./stickers"

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

const bi1 = require("../../../images/journal-background/b1.jpg")
const bi2 = require("../../../images/journal-background/b2.jpg")
const bi3 = require("../../../images/journal-background/b3.jpg")

const stickerGroug1 = stickers.slice(0, 5);
const stickerGroug2 = stickers.slice(5, 10);
const stickerGroug3 = stickers.slice(10, 15);

class PicturePanel extends React.Component {
    render() {
        return (
            <View style={styles.controlPanel}>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{}}>
                    <ScrollView tabLabel="贴纸">
                        <View style={{ justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                {stickerGroug1.map((sticker, index) => (
                                    <TouchableOpacity onPress={() => this.props.addSticker(index)} >
                                        <Image
                                            source={sticker}
                                            style={{ transform: [{ scale: getScale(Image.resolveAssetSource(sticker)) }] }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                {stickerGroug2.map((sticker, index) => (
                                    <TouchableOpacity onPress={() => this.props.addSticker(index + 5)} >
                                        <Image
                                            source={sticker}
                                            style={{ transform: [{ scale: getScale(Image.resolveAssetSource(sticker)) }] }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                {stickerGroug3.map((sticker, index) => (
                                    <TouchableOpacity onPress={() => this.props.addSticker(index + 10)} >
                                        <Image
                                            source={sticker}
                                            style={{ transform: [{ scale: getScale(Image.resolveAssetSource(sticker)) }] }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    <View tabLabel="背景" style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.changeBackground(bi1)}>
                            <Image source={bi1} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.changeBackground(bi2)}>
                            <Image source={bi2} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.changeBackground(bi3)}>
                            <Image source={bi3} style={{ height: 200, width: "100%" }} />
                        </TouchableOpacity>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

export default PicturePanel;
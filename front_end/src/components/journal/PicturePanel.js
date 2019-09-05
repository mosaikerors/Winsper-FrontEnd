import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Divider } from "react-native-elements"
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import stickers from "./stickers"
import theme from "../../theme"
import { connect } from "react-redux"
import journalBackground from "./journalBackground"

const getScale = ({ width, height }) => {
    const widthScale = (windowWidth / 5) / width;
    const heightScale = 100 / height;
    const minScale = widthScale < heightScale ? widthScale : heightScale;
    return minScale
}

const { width: windowWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    stage: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
        borderWidth: 1
    },
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    controlPanel: {
        flex: 1,
        backgroundColor: theme.palette.sky[0]
    },
    controlPanelWelcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});

const stickerGroups = [stickers.slice(0, 4), stickers.slice(4, 8), stickers.slice(8, 12)]
const moreStickerGroups = [stickers.slice(12, 16), stickers.slice(16, 20), stickers.slice(20, 24)]

const journalBackgroundLines = [journalBackground.slice(0, 3), journalBackground.slice(3, 6), journalBackground.slice(6, 9)]

const mapStateToProps = state => ({
    feather: state.user.feather,
})

class PicturePanel extends React.Component {
    render() {
        const { feather } = this.props
        return (
            <View style={styles.controlPanel}>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} style={{}}>
                    <ScrollView tabLabel="贴纸">
                        <View style={{ justifyContent: "space-between" }}>
                            {stickerGroups.map((stickerGroup, groupIndex) => (
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    {stickerGroup.map((sticker, index) => (
                                        <TouchableOpacity onPress={() => this.props.addSticker(index + 4 * groupIndex)}
                                            style={{ width: windowWidth / 5, height: 100, justifyContent: "center", alignItems: "center" }}>
                                            <Image
                                                source={sticker}
                                                style={{ transform: [{ scale: getScale(Image.resolveAssetSource(sticker)) }] }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}

                            {feather >= 10 ?
                                moreStickerGroups.map((stickerGroup, groupIndex) => (
                                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                        {stickerGroup.map((sticker, index) => (
                                            <TouchableOpacity onPress={() => this.props.addSticker(12 + index + 4 * groupIndex)}
                                                style={{ width: windowWidth / 5, height: 100, justifyContent: "center", alignItems: "center" }}
                                            >
                                                <Image
                                                    source={sticker}
                                                    style={{ transform: [{ scale: getScale(Image.resolveAssetSource(sticker)) }] }}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))
                                :
                                <View>
                                    <Divider />
                                    <Text style={{ alignSelf: "center", marginVertical: 5 }}>收集 10 根羽毛以解锁更多贴纸</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="背景" style={{}}>
                        {journalBackgroundLines.map((journalBackgroundLine, lineIndex) => (
                            <View style={{ flexDirection: "row" }}>
                                {journalBackgroundLine.map((journalBackgroundImage, index) => (
                                    <TouchableOpacity style={{ flex: 1 }}
                                        onPress={() => this.props.changeBackground(journalBackgroundImage)}
                                    >
                                        <Image source={journalBackgroundImage} style={{ height: 200, width: "100%" }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
}

export default connect(mapStateToProps)(PicturePanel);
import React from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Button, Divider } from "react-native-elements"
import Drawer from "react-native-drawer"
import Sticker from "./src/components/journal/sticker"

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

const icon4 = require("./images/sticker/icon4.png")
const icon5 = require("./images/sticker/icon5.png")
const icon6 = require("./images/sticker/icon6.png")

const getScale = ({ width, height }) => {
    const maxSize = width > height ? width : height;
    return 70 / maxSize
}

class ControlPanel extends React.Component {
    render() {
        return (
            <View style={styles.controlPanel}>
                <Text style={styles.controlPanelWelcome}>
                    Your Stickers
                </Text>
                <ScrollView>
                    <View style={{ justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity onPress={() => this.props.addSticker(1)} >
                                <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            </TouchableOpacity>
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                            <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, marginBottom: 10 }}>
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                            <Image source={icon4} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon4)) }] }} />
                            <Image source={icon6} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon6)) }] }} />
                            <Image source={icon5} style={{ transform: [{ scale: getScale(Image.resolveAssetSource(icon5)) }] }} />
                        </View>
                    </View>

                </ScrollView>

            </View>
        )
    }
}

class D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stickersOnStage: []
        }
        this.addSticker = this.addSticker.bind(this)
        this.dragResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) =>
                this.setState({
                    open: true
                }),
        });
    }

    addSticker(id) {
        console.log(id)
        let stickersOnStage = this.state.stickersOnStage;
        stickersOnStage.push(id);
        this.setState({ stickersOnStage })
    }

    render() {
        return (
            <React.Fragment>

                <Drawer
                    type="overlay"
                    content={<ControlPanel addSticker={(id) => this.addSticker(id)} />}
                    open={this.state.open}
                    openDrawerOffset={100}
                    styles={styles.drawer}
                    side="bottom"
                    tapToClose
                    openDrawerOffset={540}
                >
                    <View style={{ flex: 1 }}>
                        <Text>123</Text>
                        {this.state.stickersOnStage.map(id => (
                            <Sticker
                                key={id}
                                width={Image.resolveAssetSource(icon4).width}
                                height={Image.resolveAssetSource(icon4).height}
                                source={icon4}
                                zIndex={id}
                            />
                        ))}
                        <Sticker
                            width={Image.resolveAssetSource(icon4).width}
                            height={Image.resolveAssetSource(icon4).height}
                            source={icon4}
                            zIndex={3}
                        />
                        <Sticker
                            width={Image.resolveAssetSource(icon5).width}
                            height={Image.resolveAssetSource(icon5).height}
                            source={icon5}
                            zIndex={2}
                        />
                    </View>

                    <View style={{ alignItems: "center" }} {...this.dragResponder.panHandlers} >
                        <TouchableOpacity
                            style={{ backgroundColor: "cyan", height: 30, width: 100, alignItems: "center", justifyContent: "center" }}
                        >
                            <Text style={{}}>open</Text>
                        </TouchableOpacity>
                    </View>
                </Drawer>

            </React.Fragment>
        )
    }
}

export default D;
import React from 'react';
import { View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Sticker from "../../components/journal/Sticker"
import PicturePanel from "../../components/journal/PicturePanel"

const icon4 = require("../../../images/sticker/icon4.png")

const defaultBackgroundImage = require("../../../images/p3.jpg")

class CreateJournal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: defaultBackgroundImage,
            stickersOnStage: [],  // each element is like {id: 1, stickerId: 1, zIndex: 1}
            textsOnStage: [],   // each element is like {id: 2, text: "ahh", zIndex: 3}
            status: 0,    // 0: 正常, 1: 点了+，弹出图片和文本状态, 2: 图片抽屉弹出状态, 3: 文本抽屉弹出状态    
            text: '',
            cntId: 0,
            cntZIndex: 0,
        }
        this.addSticker = this.addSticker.bind(this)
        this.addText = this.addText.bind(this);
        this.changeBackground = this.changeBackground.bind(this)
    }

    addSticker(stickerId) {
        let { cntId, cntZIndex, stickersOnStage } = this.state;
        let sticker = {
            id: cntId,
            stickerId,
            zIndex: cntZIndex
        }
        cntId++;
        cntZIndex++;
        stickersOnStage.push(sticker);
        this.setState({ stickersOnStage, cntId, cntZIndex })
    }

    addText(text) {
        let { cntId, cntZIndex, textsOnStage } = this.state;
        let newText = {
            id: cntId,
            text,
            zIndex: cntZIndex
        }
        cntId++;
        cntZIndex++;
        textsOnStage.push(newText);
        this.setState({ textsOnStage, cntId, cntZIndex, status: 0, text: '' })
    }

    changeBackground(backgroundImage) {
        this.setState({ backgroundImage })
    }

    render() {
        console.log(this.state.status)
        const { status } = this.state;
        return (
            <React.Fragment>
                <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%', opacity: 1 }}>
                    {/* 画布 */}
                    <View style={{ flex: 1 }}>
                        {this.state.stickersOnStage.map(sticker => (
                            <Sticker
                                key={sticker.id}
                                width={Image.resolveAssetSource(icon4).width}
                                height={Image.resolveAssetSource(icon4).height}
                                source={icon4}
                                zIndex={sticker.zIndex}
                            />
                        ))}
                        {this.state.textsOnStage.map(text => (
                            <Sticker key={text.id} width={200} height={200} text={text.text} zIndex={text.zIndex} />
                        ))}
                    </View>

                    {/* 底部两个次按钮 */}
                    <View style={{ flexDirection: "row", justifyContent: "center", display: status === 1 ? "flex" : "none" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "cyan",
                                height: 50, width: 50, borderRadius: 25,
                                alignItems: "center", justifyContent: "center",
                                marginRight: 40
                            }}
                            onPress={() => this.setState({ status: 2 })}

                        >
                            <FontAwesome name="image" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "cyan",
                                height: 50, width: 50, borderRadius: 25,
                                alignItems: "center", justifyContent: "center"
                            }}
                            onPress={() => this.setState({ status: 3 })}
                        >
                            <FontAwesome name="font" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* 底部中心主按钮 */}
                    <View style={{ flexDirection: "row", justifyContent: "center", display: status === 3 ? "none" : "flex", marginTop: -30 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "cyan",
                                height: 80, width: 80, borderRadius: 40,
                                position: "relative", top: 40,
                                alignItems: "center",
                            }}
                            onPress={() => this.setState({ status: status === 0 ? 1 : 0 })}
                        >
                            <FontAwesome name={status === 2 ? "chevron-down" : "plus"} size={24} color="white" style={{ marginTop: 10 }} />
                        </TouchableOpacity>
                    </View>

                    {/* 添加图片的 panel */}
                    <View style={{ display: status === 2 ? "flex" : "none", height: 250 }}>
                        <PicturePanel addSticker={(id) => this.addSticker(id)} changeBackground={(i) => this.changeBackground(i)} />
                    </View>

                    {/* 添加文本的 panel */}
                    <View style={{ display: status === 3 ? "flex" : "none", height: 250 }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <View>
                                <TouchableOpacity onPress={() => this.setState({ status: 0 })}>
                                    <FontAwesome name="close" size={28} style={{ margin: 10 }} color="red" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                                <TouchableOpacity onPress={() => this.addText(this.state.text)}>
                                    <FontAwesome name="check" size={28} style={{ margin: 10 }} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextInput style={{
                            flex: 1, borderWidth: 1, fontSize: 20, opacity: 0.7,
                            backgroundColor: "white", borderRadius: 10, margin: 5, padding: 5
                        }}
                            value={this.state.text}
                            multiline onChangeText={(text) => this.setState({ text })}
                        />
                    </View>
                </ImageBackground>
            </React.Fragment>
        )
    }
}

export default CreateJournal;
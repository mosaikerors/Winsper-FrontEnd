import React from 'react';
import { View, TouchableOpacity, TextInput, ImageBackground, Image, ActivityIndicator, Text, Dimensions } from 'react-native';
import { Overlay, Divider } from "react-native-elements"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Sticker from "../../components/journal/Sticker"
import PicturePanel from "../../components/journal/PicturePanel"
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import agent from "../../agent/index"
import stickers from "../../components/journal/stickers"
import JournalBookSelector from '../../components/journal/JournalBookSelector';
import { connect } from "react-redux"
import AwesomeAlert from 'react-native-awesome-alerts';
import theme from "../../theme"

const requests = require('superagent');

//连接cloudinary的东西
const CLOUDINARY_UPLOAD_PRESET = 'tklfxr2k';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxm8ocsto/image/upload';

const { width: windowWidth, height: viewportHeight } = Dimensions.get('window');

const getSize = (stickerId, field) => {
    const width = Image.resolveAssetSource(stickers[stickerId]).width;
    const height = Image.resolveAssetSource(stickers[stickerId]).height;
    const widthScale = (windowWidth / 4) / width;
    const heightScale = 100 / height;
    const minScale = widthScale < heightScale ? widthScale : heightScale;
    const size = (field === "width" ? width : height) * minScale
    return size;
}

const defaultBackgroundImage = require("../../../images/journal-background/default.jpg")

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class CreateJournal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: defaultBackgroundImage,
            stickersOnStage: [],  // each element is like {id: 1, stickerId: 1, zIndex: 1}
            textsOnStage: [],   // each element is like {id: 2, text: "ahh", zIndex: 3}
            status: 0,    // 0: 正常, 1: 点了+，弹出图片和文本状态, 2: 图片抽屉弹出状态, 3: 文本抽屉弹出状态, 4: Overlay, 5: Loading, 6: Toast  
            text: '',
            cntId: 0,
            cntZIndex: 0,
        }
        this.addSticker = this.addSticker.bind(this)
        this.addText = this.addText.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.submit = this.submit.bind(this);
        this.submit2 = this.submit2.bind(this);
        this.viewShot = this.viewShot.bind(this);
        this.cancel = this.cancel.bind(this);
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

    // 点击确认按钮，弹出选择手账本界面
    submit() {
        // 隐藏按钮
        this.refs.ok.setOpacityTo(0, 0);
        this.refs.cancel.setOpacityTo(0, 0);
        this.refs.add.setOpacityTo(0, 0);
        this.refs.image.setOpacityTo(0, 0);
        this.refs.text.setOpacityTo(0, 0);
        this.setState({ status: 4 })
    }

    cancel() {
        this.refs.ok.setOpacityTo(1, 0);
        this.refs.cancel.setOpacityTo(1, 0);
        this.refs.add.setOpacityTo(1, 0);
        this.refs.image.setOpacityTo(1, 0);
        this.refs.text.setOpacityTo(1, 0);
        this.setState({ status: 0 })
    }

    // 完成手账本的选择
    submit2(journalBookId) {
        this.setState({ status: 5 })
        setTimeout(() => this.viewShot(journalBookId), 500);    // 等待按钮完全隐藏再截图 
    }

    async viewShot(journalBookId) {
        const { uId, token } = this.props;
        console.log("got here")
        console.log("journalBookId", journalBookId)
        const journalUrl = await captureScreen({ format: "jpg", result: "data-uri", quality: 0.5 }).then(uri =>
            requests.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', uri)
                .then(res => res.body.secure_url)
                .catch(err => err.response.xhr)
        )
        console.log("jurl", journalUrl)
        const response = await agent.record.createJournal(uId, token, journalBookId, journalUrl);
        console.log("jres", response)
        if (response.rescode === 0)
            this.setState({ status: 6 })
    }

    render() {
        const { status } = this.state;
        return (
            <React.Fragment>
                <JournalBookSelector isVisible={status === 4}
                    handleOk={(journalBookId) => this.submit2(journalBookId)}
                    handleCancel={this.cancel}
                />
                <Overlay overlayBackgroundColor="transparent" fullScreen isVisible={status === 5}
                    overlayStyle={{ justifyContent: "center", alignItems: "center" }}
                >
                    <ActivityIndicator size={60} color={theme.palette.sky[2]} />
                    <Text style={{ marginTop: 10, color: theme.palette.sky[2], fontSize: 24 }}>正在上传...</Text>
                </Overlay>
                <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%', opacity: 1 }}>
                    {/* 画布 */}
                    <View style={{ flex: 1 }}>
                        {this.state.stickersOnStage.map(sticker => (
                            <Sticker
                                key={sticker.id}
                                width={getSize(sticker.stickerId, "width")}
                                height={getSize(sticker.stickerId, "height")}
                                source={stickers[sticker.stickerId]}
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
                                backgroundColor: theme.palette.sky[2],
                                height: 50, width: 50, borderRadius: 25,
                                alignItems: "center", justifyContent: "center",
                                marginRight: 40, zIndex: 999,
                            }}
                            onPress={() => this.setState({ status: 2 })}
                            ref="image"
                        >
                            <FontAwesome name="image" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.palette.sky[2],
                                height: 50, width: 50, borderRadius: 25,
                                alignItems: "center", justifyContent: "center", zIndex: 999,
                            }}
                            onPress={() => this.setState({ status: 3 })}
                            ref="text"
                        >
                            <FontAwesome name="font" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* 底部按钮 */}
                    <View
                        style={{
                            flexDirection: "row", justifyContent: status === 2 ? "center" : "space-between",
                            display: status === 3 ? "none" : "flex", marginTop: -30, position: "relative", top: status === 2 ? 10 : 30
                        }}>

                        {/* cancel */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.palette.sky[2],
                                height: 100, width: 100, borderRadius: 50,
                                position: "relative", top: 20, right: 50,
                                alignItems: "center", zIndex: 999,
                                display: status === 2 ? "none" : "flex"
                            }}
                            ref="cancel"
                            onPress={() => this.props.navigation.pop()}
                        >
                            <FontAwesome name={"remove"} size={24} color="white" style={{ marginTop: 15, marginLeft: 35 }} />
                        </TouchableOpacity>

                        {/* add */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.palette.sky[2],
                                height: 80, width: 80, borderRadius: 40,
                                position: "relative", top: 30,
                                alignItems: "center", zIndex: 999
                            }}
                            ref="add"
                            onPress={() => this.setState({ status: status === 0 ? 1 : 0 })}
                        >
                            <FontAwesome name={status === 2 ? "chevron-down" : "plus"} size={24} color="white" style={{ marginTop: 10 }} />
                        </TouchableOpacity>

                        {/* ok */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.palette.sky[2],
                                height: 100, width: 100, borderRadius: 50,
                                position: "relative", top: 20, left: 50,
                                alignItems: "center", zIndex: 999,
                                display: status === 2 ? "none" : "flex"
                            }}
                            ref="ok"
                            onPress={this.submit}
                        >
                            <FontAwesome name={"check"} size={24} color="white" style={{ marginTop: 15, marginRight: 35 }} />
                        </TouchableOpacity>
                    </View>

                    {/* 添加图片的 panel */}
                    <View style={{ display: status === 2 ? "flex" : "none", height: 250, zIndex: 999 }}>
                        <PicturePanel addSticker={(id) => this.addSticker(id)} changeBackground={(i) => this.changeBackground(i)} />
                    </View>

                    {/* 添加文本的 panel */}
                    <View style={{ display: status === 3 ? "flex" : "none", height: 250, zIndex: 999 }}>
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
                <AwesomeAlert
                    show={status === 6}
                    title="上传成功"
                    showConfirmButton={true}
                    confirmText="确认"
                    onConfirmPressed={() => this.props.navigation.pop()}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(CreateJournal);
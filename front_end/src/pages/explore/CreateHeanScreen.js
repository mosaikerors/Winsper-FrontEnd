import React, { Component, Fragment } from 'react';
import { View, NativeModules } from 'react-native';
import { Button, ListItem, Divider } from 'react-native-elements'
import { connect } from "react-redux";
import RNFetchBlob from 'react-native-fetch-blob'
import { TextareaItem } from '@ant-design/react-native'
import Geolocation from 'Geolocation';
import ImageGroup from '../../components/hean/ImageGroup'
import { AK, SHA1, packageName } from '../../config';
import agent from "../../agent/index"
import AwesomeAlert from 'react-native-awesome-alerts';
import theme from "../../theme"

const ImagePicker = NativeModules.ImageCropPicker;

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});

class CreateHeanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            content: "",
            location: "",  // send to back end
            place: "添加地点",  // display to user
            showAlert: false,
            showNullAlert: false,
        };
        this.addPlace = this.addPlace.bind(this);
        this.addImage = this.addImage.bind(this);
        this.upload = this.upload.bind(this);
    }

    async upload() {
        const { images, content } = this.state;
        const { uId, token } = this.props;
        if (images.length === 0 && content === '') {
            this.setState({ showNullAlert: true })
            return;
        }
        Geolocation.getCurrentPosition(async data => {
            const location = data.coords.longitude.toString() + "," + data.coords.latitude.toString()
            // construct request body
            let body = [];
            body.push({ name: 'uId', data: uId.toString() });
            body.push({ name: 'location', data: location + ",0" });
            body.push({ name: 'text', data: this.state.content });
            for (let i = 0; i < images.length; ++i) {
                body.push({ name: 'pictures', filename: 'picture' + i.toString(), type: images[i].mime, data: RNFetchBlob.wrap(images[i].uri) })
            }

            const response = await agent.hean.upload(uId, token, body);
            if (response.rescode === 0)
                this.setState({ showAlert: true })
            //this.props.navigation.pop();
        })
    }

    addPlace() {
        Geolocation.getCurrentPosition(data => {
            let location = data.coords.latitude.toString() + "," + data.coords.longitude.toString();
            const baseUrl = "http://api.map.baidu.com/reverse_geocoding/v3/";
            const url = `${baseUrl}?output=json&coordtype=wgs84ll&location=${location}&ak=${AK}&mcode=${SHA1};${packageName}`;
            fetch(url)
                .then(res => res.json())
                .then(res => this.setState({
                    location,
                    place: res.result.formatted_address
                }))
        }, e => console.log(e, 'error'), { enableHignAccuracy: false, timeout: 20000, maximumAge: 10000 });
    }

    addImage() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            this.setState({
                images: images.map(i => ({ uri: i.path, width: i.width, height: i.height, mime: i.mime }))
            });
        }).catch(e => alert(e));
    }

    render() {
        let imageURL = [];
        let { images } = this.state;
        for (let i = 0; i < images.length; ++i) {
            imageURL.push(images[i].uri)
        }
        return (
            <Fragment>
                <View style={{ flex: 1, backgroundColor: theme.palette.sky[0] }}>
                    <TextareaItem
                        style={{ backgroundColor: theme.palette.sky[0] }}
                        placeholder="记下此刻心情"
                        value={this.state.content}
                        rows={10}
                        onChange={value => this.setState({ content: value })}
                    />
                    <ImageGroup images={imageURL} length={this.state.images.length} />
                    <View>
                        <ListItem
                            containerStyle={{ backgroundColor: theme.palette.sky[0] }}
                            title={"选择图片"}
                            onPress={this.addImage}
                            leftIcon={{ name: "image" }}
                            chevronColor="white"
                            chevron
                        />
                    </View>
                    <Divider />
                    <View style={{ alignItems: "center" }}>
                        <Button
                            title="确认"
                            onPress={this.upload}
                            buttonStyle={{ width: 90, height: 50, marginTop: 20, borderRadius: 50, backgroundColor: theme.palette.sky[2] }}
                            titleStyle={{ fontSize: 20 }}
                        />
                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        title="上传成功"
                        showConfirmButton={true}
                        confirmText="确认"
                        onConfirmPressed={() => this.props.navigation.pop()}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                    />
                    <AwesomeAlert
                        show={this.state.showNullAlert}
                        title="不能写一封没有文字或图片的函哦"
                        showConfirmButton={true}
                        confirmText="好"
                        onConfirmPressed={() => this.setState({ showNullAlert: false })}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                    />
                </View>
            </Fragment >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHeanScreen);
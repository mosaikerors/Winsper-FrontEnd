import React, { Component, Fragment } from 'react';
import { View, NativeModules } from 'react-native';
import { Button, ListItem } from 'react-native-elements'
import { connect } from "react-redux";
import RNFetchBlob from 'react-native-fetch-blob'
import { TextareaItem } from '@ant-design/react-native'
import Geolocation from 'Geolocation';
import ImageGroup from '../../components/hean/ImageGroup'
import { AK, SHA1, packageName } from '../../config';

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
            place: "添加地点"  // display to user
        };
        this.addPlace = this.addPlace.bind(this);
        this.addPrivacy = this.addPrivacy.bind(this);
        this.addImage = this.addImage.bind(this);
        this.upload = this.upload.bind(this);
    }

    async upload() {
        const { images } = this.state;
        const { uId, token } = this.props;

        // construct request body
        let body = [];
        body.push({ name: 'uId', data: uId.toString() });
        body.push({ name: 'location', data: this.state.location + ",0" });
        body.push({ name: 'text', data: this.state.content });
        for (let i = 0; i < images.length; ++i) {
            body.push({ name: 'pictures', filename: 'picture' + i.toString(), type: images[i].mime, data: RNFetchBlob.wrap(images[i].uri) })
        }

        const response = await agent.hean.upload(uId, token, body);
        if (response.rescode === 0)
            this.props.navigation.pop();
    }

    addPrivacy() {
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
                <TextareaItem
                    placeholder="记下此刻心情"
                    value={this.state.content}
                    rows={10}
                    onChange={value => this.setState({ content: value })}
                />
                <ImageGroup images={imageURL} length={this.state.images.length} />
                <View>
                    <ListItem
                        title={"添加图片"}
                        onPress={this.addImage}
                        leftIcon={{ name: "image" }}
                        chevronColor="white"
                        chevron
                    />
                    <ListItem
                        title={this.state.place}
                        onPress={this.addPlace}
                        leftIcon={{ name: "map" }}
                        chevronColor="white"
                        chevron
                    />
                    <Button title={"提交"} onPress={this.upload} />
                </View>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHeanScreen);
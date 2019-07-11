import React, { Component, Fragment } from 'react';
import { TextareaItem } from '@ant-design/react-native'
import { Button, ListItem } from 'react-native-elements'
import { View, NativeModules } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import Geolocation from 'Geolocation';
import ImageGroup from '../../components/common/ImageGroup'
import { AK, SHA1, packageName } from '../../config';

const uId = "10";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlVTRVIiLCJzdWIiOiIxMCIsImV4cCI6MTU2NDA0MTEwNH0.LA9iZG7Y4Um31ZV_uy7qj0FUw06IuddiYmtXpzWxRIxR_9JDMjHn7osuC8Gm0LPUhMssD5axN75u3s3Tx80hEQ";
const ImagePicker = NativeModules.ImageCropPicker;

class CreateHeanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            content: "",
            location: "", // send to back end
            place: "添加地点"     // display to user
        };
        this.addPlace = this.addPlace.bind(this);
        this.addPrivacy = this.addPrivacy.bind(this);
        this.addImage = this.addImage.bind(this);
        this.upload = this.upload.bind(this);
        this.changeContent = this.changeContent.bind(this)
    }

    changeContent(value) {
        this.setState({
            content: value
        });
    };

    upload() {
        let { images } = this.state;
        let body = [];
        body.push({ name: 'uId', data: uId });
        body.push({ name: 'location', data: this.state.location + ",0" });
        body.push({ name: 'text', data: this.state.content });
        for (let i = 0; i < images.length; ++i) {
            body.push({ name: 'pictures', filename: 'picture' + i.toString(), type: images[i].mime, data: RNFetchBlob.wrap(images[i].uri) })
        }

        RNFetchBlob.fetch('POST', 'http://47.103.0.246:7120/hean/upload', {
            Authorization: "Bearer " + token,
            uId: uId,
            token: token,
            'Content-Type': 'multipart/form-data',
        }, body
        ).then((resp) => {
            if (resp["message"] === "ok") {

            }
        }).catch((err) => {
            console.log(err)
        })
    }


    addPrivacy() {
    }

    addPlace() {
        Geolocation.getCurrentPosition(data => {
            let location = data.coords.latitude.toString() + "," + data.coords.longitude.toString();
            //let url = "http://api.map.baidu.com/reverse_geocoding/v3/?output=json&coordtype=wgs84ll&" +
            //    "location=" + location + "&ak=hhuldMVGYO4w0sRt8FVTXVIFbG5mA1Lz&mcode=09:D4:76:A9:31:7F:98:" +
            //    "C0:38:21:C3:D2:35:AB:60:AE:94:36:EB:45;com.front_end";
            const baseUrl = "http://api.map.baidu.com/reverse_geocoding/v3/";
            const url = `${baseUrl}?output=json&coordtype=wgs84ll&location=${location}&ak=${AK}&mcode=${SHA1};${packageName}`;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        location,
                        place: res.result.formatted_address
                    })
                })
        });
    }

    addImage() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            console.log(images)
            this.setState({
                images: images.map(i => ({ uri: i.path, width: i.width, height: i.height, mime: i.mime }))
            });
        }).catch(e => alert(e));
    }
    
    static navigationOptions = {
        title: '新建',
    };

    render() {
        return (
            <Fragment>
                <TextareaItem
                    placeholder="记下此刻心情"
                    value={this.state.content}
                    rows={10}
                    onChange={this.changeContent}
                />
                {
                    this.state.images.length !== 0 ?
                        <ImageGroup images={this.state.images} length={this.state.images.length} />
                        :
                        null
                }
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
export default CreateHeanScreen;


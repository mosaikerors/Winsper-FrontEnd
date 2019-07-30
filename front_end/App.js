import React from 'react'
import { View, Text, Image, CameraRoll } from "react-native"
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Button } from 'react-native-elements';
const requests = require('superagent');

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.clickA = this.clickA.bind(this);
        this.clickB = this.clickB.bind(this);
    }

    clickA() {
        /*this.refs.A.capture().then(uri => {
            console.log("do something with A: ", uri);
        });*/
        console.log("@@@@@@")
        captureRef(this.refs.A, { format: "jpg", result: "tmpfile" }).
            then(uri => {
                requests.post("https://api.cloudinary.com/v1_1/dxm8ocsto/image/upload").field('image', uri)
                    .then(res => console.log(res.body.secure_url))
                    .catch(err => console.log(err))
            })
        //then(uri => { tmp = uri;console.log(tmp); CameraRoll.saveToCameraRoll(tmp)})


    }
    clickB() {
        /*this.refs.B.capture().then(uri => {
            console.log("do something with B: ", uri);
        });*/
        captureScreen({ format: "jpg" }).then(uri => CameraRoll.saveToCameraRoll(uri))
    }

    render() {
        return (
            <React.Fragment>
                <ViewShot ref="A">
                    <View style={{ width: 100, height: 100, backgroundColor: "blue" }}>
                        <Text>A</Text>
                    </View>
                </ViewShot>
                <ViewShot ref="B">
                    <View style={{ width: 100, height: 100, backgroundColor: "violet" }}>
                        <Text>B</Text>
                    </View>
                </ViewShot>
                <Button
                    title="A"
                    onPress={this.clickA}
                />
                <Button
                    title="B"
                    onPress={this.clickB}
                />
                <Image source={{ uri: "file:///data/user/0/com.front_end/cache/ReactNative-snapshot-image5134457190681563875.jpg" }} />
            </React.Fragment>
        )
    }
}
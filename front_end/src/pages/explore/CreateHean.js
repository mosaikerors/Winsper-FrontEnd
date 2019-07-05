import React, {Component, Fragment} from 'react';
import {TextareaItem} from '@ant-design/react-native'
import {ListItem} from 'react-native-elements'
import {
    View, ScrollView,
    Image, NativeModules,Alert
} from 'react-native';

const ImagePicker = NativeModules.ImageCropPicker;

class App extends Component{
    constructor() {
        super();
        this.state = {
            images: null
        };
        this.renderImage = this.renderImage.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.addPrivacy = this.addPrivacy.bind(this);
        this.addImage = this.addImage.bind(this);
        
    }
    
    addPrivacy(){
        Alert.alert("privacy")
    }
    
    addPlace(){
        Alert.alert("place")
    }
    
    addImage() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            this.setState({
                images: images.map(i => {
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            });
        }).catch(e => alert(e));
    }
    
    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
    
    static navigationOptions = {
        title: 'New',
    };
    
    render() {
        return (
            <Fragment>
                <TextareaItem
                    placeholder="记下此刻心情"
                    rows={10}
                />
                <ScrollView>
                    {this.state.image ? this.renderImage(this.state.image) : null}
                    {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
                </ScrollView>
                <View>
                    <ListItem
                        title={"添加图片"}
                        onPress={this.addImage}
                        leftIcon={{ name: "image" }}
                        chevronColor="white"
                        chevron
                    />
                    <ListItem
                        title={"地点"}
                        onPress={this.addPlace}
                        leftIcon={{ name: "map" }}
                        chevronColor="white"
                        chevron
                    />
                    <ListItem
                        title={"可见范围"}
                        onPress={this.addPrivacy}
                        leftIcon={{ name: "people" }}
                        chevronColor="white"
                        chevron
                    />
                </View>
            </Fragment>
        );
    }
}

export default App;

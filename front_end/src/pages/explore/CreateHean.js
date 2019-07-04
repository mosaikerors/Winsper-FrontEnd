import React, {Component, Fragment} from 'react';
import { TextareaItem } from '@ant-design/react-native'
import {ListItem} from 'react-native-elements'
import {
    View, Text, StyleSheet, ScrollView,
    Image, TouchableOpacity, NativeModules,
} from 'react-native';
import ''
let ImagePicker = NativeModules.ImageCropPicker;

export default class App extends Component{
    constructor() {
        super();
        this.state = {
            image: null,
            images: null
        };
        this.list = [
            { title: '地点', func: this.pickMultiple },
            { title: '私密度', func: this.pickMultiple },
            { title: '添加照片', func: this.pickMultiple }
        ];
        this.renderImage = this.renderImage.bind(this);
        this.pickMultiple = this.pickMultiple.bind(this);
    }
    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
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
                    rows={10}
                    placeholder="记下此刻心情"
                    autoHeight
                    style={{ paddingVertical: 5 }}
                    
                />
                <View style={styles.container}>
                    <ScrollView>
                        {this.state.image ? this.renderImage(this.state.image) : null}
                        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
                    </ScrollView>
                    <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
                        <Text style={styles.text}>Select Multiple</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.list.map((item,i)=>(
                        <ListItem
                            key={i}
                            title={item.title}
                            onPress={()=>item.func}
                        />
                    ))
                }
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        marginBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

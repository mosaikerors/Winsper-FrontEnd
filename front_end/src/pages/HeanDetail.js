import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Image, Text} from "react-native-elements";
const {height, width} = Dimensions.get("window");

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            count:3,
            images:
                [
                    "http://i0.hdslb.com/bfs/archive/1.jpg",
                    "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0",
                    "https://04imgmini.eastday.com/mobile/20190704/20190704163428_479ba6554be5639c7db51838bb57ad45_1.jpeg"
                ]
        }
    }
    render() {
        return (
            <View>
                <Image source={{uri:"http://i0.hdslb.com/bfs/archive/1.jpg"}}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    red: {
        // flex:1,
        backgroundColor:"red",
        height:100,
        width:100
    },
    blue: {
        backgroundColor:"blue",
        height:100,
        width:100
    },
    orange: {
        backgroundColor:"orange",
        height:100,
        width:100
        
    }
});
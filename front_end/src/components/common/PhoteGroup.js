import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Image} from "react-native-elements";
const {width} = Dimensions.get("window");

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            count:4,
            images:
                [
                    "https://images.pexels.com/photos/1343465/pexels-photo-1343465.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                    "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0",
                    "https://04imgmini.eastday.com/mobile/20190704/20190704163428_479ba6554be5639c7db51838bb57ad45_1.jpeg",
                    "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0",
                ]
        }
    }
    render() {
        switch(this.state.count) {
            case 1:
                return(
                    <View style={styles.container}>
                        <Image source={{uri: this.state.images[0]}} style={styles.big}/>
                    </View>);
            case 2:
                return (
                    <View style={styles.container}>
                        <Image source={{uri: this.state.images[0]}} style={styles.small}/>
                        <Image source={{uri: this.state.images[1]}} style={styles.small}/>
                    </View>);
            case 3:
                return (
                    <View style={styles.container}>
                        <Image source={{uri: this.state.images[0]}} style={styles.small}/>
                        <Image source={{uri: this.state.images[1]}} style={styles.small}/>
                        <Image source={{uri: this.state.images[2]}} style={styles.small}/>
                    </View>);
            case 4:
                return (
                    <View>
                        <View style={styles.container}>
                            <Image source={{uri: this.state.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.state.images[1]}} style={styles.small}/>
                        </View>
                        <View style={styles.container}>
                            <Image source={{uri: this.state.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.state.images[1]}} style={styles.small}/>
                        </View>
                    </View>);
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex:0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft:width/6
    },
    big: {
        height:width/2,
        width:width/2
    },
    small: {
        height:width/4,
        width:width/4
    }
});
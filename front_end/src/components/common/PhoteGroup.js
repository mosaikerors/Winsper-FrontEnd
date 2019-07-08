import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Image} from "react-native-elements";

const {width} = Dimensions.get("window");

export default class App extends Component{
    constructor(props){
        super(props);
    }
    render() {
        switch(this.props.images.length) {
            case 1:
                return(
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            <Image source={{uri: this.props.images[0]}} style={styles.big}/>
                        </View>
                    </View>);
                    
            case 2:
                return (
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                        </View>
                    </View>);
            case 3:
                return (
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[2]}} style={styles.small}/>
                        </View>
                    </View>);
            case 4:
                return (
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                        </View>
                        <View style={styles.photo}>
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                        </View>
                    </View>);
        }
    }
}
const styles = StyleSheet.create({
    container:{
        marginTop:5,
        marginBottom:5
    },
    photo: {
        flex:0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
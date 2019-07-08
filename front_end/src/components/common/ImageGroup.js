import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Image} from "react-native-elements";

const {width} = Dimensions.get("window");

export default class App extends Component{
    constructor(props){
        super(props);
    }
    render() {
        switch(this.props.length){
            case 1:
                return(
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[0].url}} style={styles.big}/>
                        </View>
                    </View>);
                    
            case 2:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[0].url}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].url}} style={styles.small}/>
                        </View>
                    </View>);
            case 3:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[0].url}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].url}} style={styles.small}/>
                            <Image source={{uri: this.props.images[2].url}} style={styles.small}/>
                        </View>
                    </View>);
            case 4:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[0].url}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].url}} style={styles.small}/>
                        </View>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[2].url}} style={styles.small}/>
                            <Image source={{uri: this.props.images[3].url}} style={styles.small}/>
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
    image: {
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
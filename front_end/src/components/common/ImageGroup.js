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
<<<<<<< HEAD
                            <Image source={{uri: this.props.images[0]}} style={styles.big}/>
=======
                            <Image source={{uri: this.props.images[0].uri}} style={styles.big}/>
>>>>>>> d999f2f1995e372e9380c12330fdebba83d60750
                        </View>
                    </View>);
                    
            case 2:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
<<<<<<< HEAD
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
=======
                            <Image source={{uri: this.props.images[0].uri}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].uri}} style={styles.small}/>
>>>>>>> d999f2f1995e372e9380c12330fdebba83d60750
                        </View>
                    </View>);
            case 3:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
<<<<<<< HEAD
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[2]}} style={styles.small}/>
=======
                            <Image source={{uri: this.props.images[0].uri}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].uri}} style={styles.small}/>
                            <Image source={{uri: this.props.images[2].uri}} style={styles.small}/>
>>>>>>> d999f2f1995e372e9380c12330fdebba83d60750
                        </View>
                    </View>);
            case 4:
                return (
                    <View style={styles.container}>
                        <View style={styles.image}>
<<<<<<< HEAD
                            <Image source={{uri: this.props.images[0]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1]}} style={styles.small}/>
                        </View>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[2]}} style={styles.small}/>
                            <Image source={{uri: this.props.images[3]}} style={styles.small}/>
=======
                            <Image source={{uri: this.props.images[0].uri}} style={styles.small}/>
                            <Image source={{uri: this.props.images[1].uri}} style={styles.small}/>
                        </View>
                        <View style={styles.image}>
                            <Image source={{uri: this.props.images[2].uri}} style={styles.small}/>
                            <Image source={{uri: this.props.images[3].uri}} style={styles.small}/>
>>>>>>> d999f2f1995e372e9380c12330fdebba83d60750
                        </View>
                    </View>);
            default:
                return null;
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
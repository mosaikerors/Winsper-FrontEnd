import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Avatar, Text} from "react-native-elements";
const {width} = Dimensions.get("window");

export default class Comment extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <View style={{backgroundColor:"#e0f7fa",marginTop:2,marginBottom:2}}>
                <View style={{flex:0, flexDirection:"row", alignItems:"center"}}>
                    <Avatar
                        rounded
                        size={"small"}
                        source={{uri: this.props.avatar}}
                    />
                    <View style={{flex:0, flexDirection:"column"}}>
                        <Text style={{marginLeft:10}}>{this.props.username}</Text>
                        <Text style={{marginLeft:10}}>{this.props.time}</Text>
                    </View>
                </View>
                <Text>{this.props.content}</Text>
            </View>
        )
    }
}
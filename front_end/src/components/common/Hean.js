import Carousel from 'react-native-looped-carousel';
import React, {Component, Fragment} from "react";
import {Text, View} from 'react-native'
import {Image} from "react-native-elements";
import {getTheme} from 'react-native-material-kit';

const theme = getTheme();

export default class Hean extends Component{
    constructor(props){
        super(props);
        this.state = {
            CarouselItem: [
                {
                    key: 1,
                    src: "https://images.pexels.com/photos/2171077/pexels-photo-2171077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                },
                {
                    key: 2,
                    src: "https://images.pexels.com/photos/1727200/pexels-photo-1727200.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                },
                {
                    key:3,
                    src:"https://images.pexels.com/photos/1702624/pexels-photo-1702624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
            ]
        }
    }
    
    render(){
        return(
            <Fragment>
                <Text>{"hello"}</Text>
                <View style={theme.cardStyle}>
                    <Image source={{uri : base64Icon}} style={theme.cardImageStyle} />
                    <Text style={theme.cardTitleStyle}>Welcome</Text>
                    <Text style={theme.cardContentStyle}>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia..."}
                    </Text>
                    <Text style={theme.cardActionStyle}>My Action</Text>
                </View>
            </Fragment>
        )
    }
}
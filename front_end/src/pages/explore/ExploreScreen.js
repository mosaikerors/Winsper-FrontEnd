import React from "react";
import { View } from "react-native";
import {Header, ListItem} from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native"
import CreateHean from "./CreateHean"
import { createStackNavigator, createAppContainer } from 'react-navigation';



class Explore extends React.Component {
    
    static navigationOptions = {
        title: 'Explore',
    };
    
    constructor(props){
        super(props);
        this.state = {
            errors: []
        }
        this.props = props;
        this._carousel = {};
        this.init();
    }
    
    init(){
        this.state = {
            videos: [
                {
                    id: "WpIAc9by5iU",
                    thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
                    title: "Led Zeppelin - Stairway To Heaven"
                }, {
                    id: "sNPnbI1arSE",
                    thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
                    title: "Eminem - My Name Is"
                }, {
                    id: "VOgFZfRVaww",
                    thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
                    title: ""
                }
            ]
        };
        
        console.log("ThumbnailCarousel Props: ", this.props)
    }
    
    handleSnapToItem(index){
        console.log("snapped to ", index)
    }
    
    _renderItem = ( {item, index} ) => {
        console.log("rendering,", index, item)
        return (
            <ThumbnailBackgroundView>
                <CurrentVideoTO
                    onPress={ () => {
                        console.log("clicked to index", index)
                        this._carousel.snapToItem(index);
                    }}
                >
                    <CurrentVideoImage source={{ uri: item.thumbnail }} />
                </CurrentVideoTO>
                <VideoTitleText>{item.title}</VideoTitleText>
            </ThumbnailBackgroundView>
        );
    }
    
    render() {
        return (
            <View>
                <CarouselBackgroundView>
                    <Carousel
                        ref={ (c) => { this._carousel = c; } }
                        data={this.state.videos}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={this.handleSnapToItem.bind(this)}
                        sliderWidth={360}
                        itemWidth={256}
                        layout={'default'}
                        firstItem={0}
                        loop={true}
                    />
                </CarouselBackgroundView>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            onPress={()=>this.props.navigation.navigate(item.pagename)}
                        />
                    ))
                }
                
            </View>
        );
    }
}

const Stack = createStackNavigator(
    {
        Explore: {
            screen: Explore,
        },
        CreateHean: {
            screen: CreateHean,
        },
    },
    {
        initialRouteName: 'Explore',
    }
);

const Container = createAppContainer(Stack);

export default class ExploreScreen extends React.Component {
    render() {
        return <Container />;
    }
}

const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256;
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: black;
  height: 200;
  width: 100%;
`
const list = [
    {
        title: '手账',
        icon: 'av-timer',
        pagename: 'CreateHean'
    },
    {
        title: '函',
        icon: 'flight-takeoff',
        pagename: 'CreateHean'
    
    },
    {
        title: '心情报表',
        icon: 'av-timer',
        pagename: 'CreateHean'
    },
    {
        title: '日记',
        icon: 'flight-takeoff',
        pagename: 'CreateHean'
    }
];
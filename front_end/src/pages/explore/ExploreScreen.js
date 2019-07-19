import React, { Fragment } from "react";
import { Image, ListItem } from "react-native-elements";
import { Dimensions } from 'react-native'
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');
const list = [
    {
        title: '手账',
        icon: 'av-timer',
        pagename: 'CreateJournal'
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

class ExploreScreen extends React.Component {
    static navigationOptions = {
        title: '发现',
    };

    constructor(props) {
        super(props);
        this.state = {
            size: { width: width, height: height / 3 },
            CarouselItem: [
                {
                    key: 1,
                    src: "https://500px.com/photo/311850945/rohrweihe-western-marsh-harrier-hunting-by-sigrun-br%C3%BCggenthies"
                },
                {
                    key: 2,
                    src: "https://images.pexels.com/photos/1727200/pexels-photo-1727200.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                },
                {
                    key: 3,
                    src: "https://images.pexels.com/photos/1702624/pexels-photo-1702624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
            ]
        }
    }

    render() {
        return (
            <Fragment>
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay
                    pageInfo
                >
                    {
                        this.state.CarouselItem.map((item, i) => (
                            <Image
                                key={i}
                                source={{ uri: item.src }}
                                style={this.state.size} />
                        ))
                    }

                </Carousel>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            onPress={() => this.props.navigation.navigate(item.pagename)}
                        />
                    ))
                }
            </Fragment>
        );
    }
}

export default ExploreScreen;
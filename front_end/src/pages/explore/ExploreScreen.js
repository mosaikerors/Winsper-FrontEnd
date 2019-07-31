import React, { Fragment } from "react";
import { Dimensions } from 'react-native'
import { Image, ListItem } from "react-native-elements";
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

const list = [
    {
        title: '手账',
        icon: 'star',
        pagename: 'CreateJournal'
    },
    {
        title: '函',
        icon: 'info',
        pagename: 'CreateHean'

    },
    {
        title: '心情报表',
        icon: 'av-timer',
        pagename: 'CreateHean'
    },
    {
        title: '日记',
        icon: 'rowing',
        pagename: 'CreateDiary'
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
                    src: "https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                },
                {
                    key: 2,
                    src: "https://images.pexels.com/photos/2679542/pexels-photo-2679542.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                },
                {
                    key: 3,
                    src: "https://images.pexels.com/photos/2325505/pexels-photo-2325505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
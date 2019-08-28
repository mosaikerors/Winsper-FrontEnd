import React, { Fragment } from "react";
import { Dimensions } from 'react-native'
import { Image, ListItem } from "react-native-elements";
import Carousel from 'react-native-looped-carousel';
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');

const list = [
    {
        title: '手账',
        icon: 'md-journal',
        pagename: 'CreateJournal',
        params: {}
    },
    {
        title: '函',
        icon: 'info',
        pagename: 'CreateHean',
        params: {}

    },
    {
        title: '投稿',
        icon: 'av-timer',
        pagename: 'PostSubmission',
        params: { otherUId: 0 }
    },
    {
        title: '日记',
        icon: 'md-book',
        pagename: 'CreateDiary',
        params: {}
    }
];

class ExploreScreen extends React.Component {
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
                            leftIcon={<Ionicons name={item.icon} size={20} />}
                            onPress={() => this.props.navigation.push(item.pagename, item.params)}
                        />
                    ))
                }
            </Fragment>
        );
    }
}
export default ExploreScreen;
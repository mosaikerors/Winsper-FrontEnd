import React, { Fragment } from "react";
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { Image, ListItem } from "react-native-elements";
import Carousel from 'react-native-looped-carousel';
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../theme"
const { width, height } = Dimensions.get('window');

const list = [
    {
        title: '手账',
        icon: 'ios-journal',
        pagename: 'CreateJournal',
        params: {}
    },
    {
        title: '函',
        icon: 'ios-mail',
        pagename: 'CreateHean',
        params: {}
    },
    {
        title: '投稿',
        icon: 'ios-paper-plane',
        pagename: 'PostSubmission',
        params: { otherUId: 0 }
    },
    {
        title: '日记',
        icon: 'ios-book',
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
                require("../../../images/c1.jpg"),
                require("../../../images/c2.jpg"),
                require("../../../images/c3.jpg"),
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
                                source={item}
                                style={this.state.size} />
                        ))
                    }
                </Carousel>
                <View style={{ borderWidth: 0, alignItems: "center", paddingTop: 40, flex: 1, backgroundColor: theme.palette.sky[0] }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderTopLeftRadius: 30, borderWidth: 1, borderColor: theme.palette.sky[1] }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("CreateJournal")}
                                style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                            >
                                <Ionicons name={"ios-journal"} size={30} color={theme.palette.sky[2]} />
                                <Text style={{ fontSize: 26, marginLeft: 5 }}>制作手账</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopRightRadius: 30, borderWidth: 1, borderLeftWidth: 0, borderColor: theme.palette.sky[1] }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("CreateHean")}
                                style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                            >
                                <Ionicons name={"ios-mail"} size={30} color={theme.palette.sky[2]} />
                                <Text style={{ fontSize: 26, marginLeft: 5 }}>写函</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderBottomLeftRadius: 30, borderWidth: 1, borderTopWidth: 0, borderColor: theme.palette.sky[1] }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("PostSubmission")}
                                style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                            >
                                <Ionicons name={"ios-paper-plane"} size={30} color={theme.palette.sky[2]} />
                                <Text style={{ fontSize: 26, marginLeft: 5 }}>投稿</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderBottomRightRadius: 30, borderBottomWidth: 1, borderRightWidth: 1, borderColor: theme.palette.sky[1] }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("CreateDiary")}
                                style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                            >
                                <Ionicons name={"ios-book"} size={30} color={theme.palette.sky[2]} />
                                <Text style={{ fontSize: 26, marginLeft: 5 }}>写日记</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Fragment>
        );
    }
}
export default ExploreScreen;
import React from 'react';
import { Dimensions } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ExploreScreenNavigator from './explore/index';
import MyInfoScreenNavigator from './myinfo/index';
import MapScreen from './map/index';

const deviceW = Dimensions.get('window').width;

const basePx = 375;

const px2dp = px => px * deviceW / basePx;

const Home = createBottomTabNavigator(
    {
        Explore: ExploreScreenNavigator,
        Map: MapScreen,
        MyInfo: MyInfoScreenNavigator
    },
    {
        initialRouteName: "Map",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                const color = focused ? "#3496e0" : "#666";
                if (routeName === 'Explore')
                    return <Ionicons name={"md-planet"} size={px2dp(22)} color={color} />;
                else if (routeName === 'Map')
                    return <FontAwesome name={"map-marker"} size={px2dp(22)} color={color} />;
                else
                    return <FontAwesome name={"user"} size={px2dp(22)} color={color} />;
            },
        })
    }
);

export default createAppContainer(Home);
import ExploreScreenNavigator from './explore/index';
import MyInfoScreenNavigator from './myinfo/index';
import MapScreen from './map/MapScreen';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native'

const deviceW = Dimensions.get('window').width;
const basePx = 375;
const styles = StyleSheet.create({

});

function px2dp(px) {
    return px * deviceW / basePx
}

const Home = createBottomTabNavigator(
    {
        Explore: ExploreScreenNavigator,
        Map: { screen: MapScreen },
        MyInfo: MyInfoScreenNavigator
    },
    {
        initialRouteName: "Map",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                const color = focused ? "#3496e0" : "#666"
                if (routeName === 'Explore')
                    return <Ionicons name={"md-planet"} size={px2dp(22)} color={color} />;
                else if (routeName === 'Map')
                    return <FontAwesome name={"map-marker"} size={px2dp(22)} color={color} />;
                else
                    return <FontAwesome name={"user"} size={px2dp(22)} color={color} />;
            },
        }),
        tabBarOptions: {
            style: { backgroundColor: 'rgba(255,255,255,0)' },
            //activeBackgroundColor: "red"
        }
    }
);

export default createAppContainer(Home);
import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ExploreScreen from './explore/ExploreScreen';
import MyInfoScreen from './myinfo/MyInfoScreen';
import MapScreen from './map/MapScreen';

const TabNavigator = createBottomTabNavigator({
    Explore: { screen: ExploreScreen },
    Map: { screen: MapScreen },
    MyInfo: { screen: MyInfoScreen },
});

export default createAppContainer(TabNavigator);
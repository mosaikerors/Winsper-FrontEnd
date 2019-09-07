import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ExploreScreenNavigator from './explore/index';
import MyInfoScreenNavigator from './myinfo/index';
import MapScreen from './map/index';
import BottomTabNavigator from '../components/BottomTabNavigator';

const Home = createBottomTabNavigator(
    {
        Explore: ExploreScreenNavigator,
        Map: MapScreen,
        MyInfo: MyInfoScreenNavigator,
    },
    {
        initialRouteName: "MyInfo",
        tabBarComponent: (props) => (<BottomTabNavigator {...props} />)
    }
);

export default createAppContainer(Home);
import ExploreScreenNavigator from './explore/index';
import MyInfoScreenNavigator from './myinfo/index';
import MapScreen from './map/MapScreen';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native'
import TabNavigator from "react-native-tab-navigator";

const deviceW = Dimensions.get('window').width;
const basePx = 375;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

function px2dp(px) {
    return px * deviceW / basePx
}

export default class TabDemo extends Component {
    state = {
        selectedTab: 'map'
    };

    render() {
        return (
            <TabNavigator style={styles.container} tabBarStyle={{backgroundColor:'#ffffff'}}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'explore'}
                    title="Explore"
                    selectedTitleStyle={{ color: "#3496f0" }}
                    renderIcon={() => <Ionicons name="md-planet" size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Ionicons name="md-planet" size={px2dp(22)} color="#3496f0" />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'explore' })}>
                    <ExploreScreenNavigator />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'map'}
                    title="Map"
                    selectedTitleStyle={{ color: "#3496f0" }}
                    renderIcon={() => <Icon name="map-marker" size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name="map-marker" size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'map' })}>
                    <MapScreen />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'myInfo'}
                    title="MyInfo"
                    selectedTitleStyle={{ color: "#3496f0" }}
                    renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'myInfo' })}>
                    <MyInfoScreenNavigator />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

import React from "react";
import {Text, View} from "react-native";
import { MapView,MapTypes } from "react-native-baidu-map"
import MapDemo from "./MapDemo";
import MyMap from "./MyMap";

class MyInfoScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*<MyMap />*/}
                <Text>map</Text>
            </View>
        );
    }
}
export default MyInfoScreen;
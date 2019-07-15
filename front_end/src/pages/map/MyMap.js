import React, { Component } from 'react';
//import { MapView, MapTypes, Overlay } from 'react-native-baidu-map';
import { MapView } from "react-native-amap3d"
import { StyleSheet, Dimensions } from 'react-native';

import Geolocation from 'Geolocation'

export default class MyMap extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <React.Fragment>
                <MapView
                    style={styles.map}
                    showsZoomControls={false}
                    zoomLevel={16.5}
                    coordinate={{
                        latitude: 31.0316825,
                        longitude: 121.4445179,
                    }}
                    onPress={() => Geolocation.getCurrentPosition(data => {
                        console.log(data.coords)
                    }, e => {
                        console.log(e, 'error');
                    },
                        { enableHignAccuracy: false, timeout: 20000, maximumAge: 10000 }
                    )}
                >
                    <MapView.Marker
                        draggable
                        title='这是一个可拖拽的标记'
                        onDragEnd={({ nativeEvent }) =>
                            console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
                        coordinate={{
                            latitude: 31.0316825,
                            longitude: 121.4445179,
                        }}
                    />
                </MapView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginBottom: 16
    }
});
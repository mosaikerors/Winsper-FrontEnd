import React, {Component, Fragment} from 'react';
import { MapView } from "react-native-amap3d"
import { StyleSheet, Dimensions } from 'react-native';
export default class MyMap extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <MapView
                    style={styles.map}
                    showsZoomControls={false}
                    zoomLevel={16.5}
                    coordinate={{
                        latitude: 31.0316825,
                        longitude: 121.4445179,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                        latitude: 31.0316825,
                        longitude: 121.4445179,
                    }}
                    />
                </MapView>
            </Fragment>
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
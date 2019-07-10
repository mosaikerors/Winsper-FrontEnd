import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Overlay
} from 'react-native-baidu-map';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Geolocation from 'Geolocation'
import Dimensions from 'Dimensions';

export default class MyMap extends Component {

    constructor() {
        super();

        this.state = {
            mapType: MapTypes.NORMAL,
            zoom: 16.5,
            center: {
                longitude: 121.4445179,
                latitude: 31.0316825
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 121.4445179,
                latitude: 31.0316825,
                title: "Window of the world"
            }, {
                longitude: 113.995516,
                latitude: 22.537642,
                title: ""
            }]
        };
    }

    componentWillMount() {
        console.log(123)
    }

    render() {
        return (
            <React.Fragment>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoomControlsVisible={false}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map} // critial!!
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                        console.log(e)
                    }}
                >
                    {this.props.heans.map(hean => {
                        console.log(hean);
                        return (
                            <Overlay.Marker
                                location={{ longitude: hean.longtitude, latitude: hean.latitude }}
                            />
                        )
                    })}
                </MapView>
                {/*<Button title="Locate" onPress={() => {
                    //console.warn('center', this.state.center.longitude);
                    console.log("here")
                    Geolocation.getCurrentPosition(data => {
                        console.log(data.coords)
                        //console.log(Object.keys(data))
                        const json = JSON.stringify(data)
                        //console.log(json);
                        //console.log(Object.keys(json))
                    }, e => {
                        console.log(e, 'error');
                    })
                }} />*/}
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
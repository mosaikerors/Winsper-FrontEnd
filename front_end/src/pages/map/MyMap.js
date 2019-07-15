import React, {Component} from 'react';
import { MapView, MapTypes, Overlay } from 'react-native-baidu-map';
import { StyleSheet, Dimensions } from 'react-native';

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

    render() {
        return (
            <React.Fragment>
                <MapView
                    //trafficEnabled={this.state.trafficEnabled}
                    //baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    //zoomControlsVisible={false}
                    zoom={this.state.zoom}
                    mapType={MapTypes.NORMAL}
                    center={this.state.center}
<<<<<<< HEAD
                    //marker={this.state.marker}
                    //markers={this.state.markers}
                    style={styles.map} // critial!!
                    //onMarkerClick={(e) => {
                    //    console.warn(JSON.stringify(e));
                    //}}
                    onMapClick={(e) => {
                        console.log(e);
                        this.props.tabBar.hide()
=======
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                        console.log(e);
                        console.log(this.props.heans)
>>>>>>> 3ac9ec47915de4166b0e6e59236593e83b063583
                    }}
                >
                    {this.props.heans.map(hean => {
                        return (
                            <Overlay.Marker
                                location={{ longitude: hean.longtitude, latitude: hean.latitude }}
                            />
                        )
                    })}
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
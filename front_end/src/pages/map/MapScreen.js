import React from 'react';
import { MapView, Marker, Polyline } from "react-native-amap3d"
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import HeanCard from '../../components/hean/HeanCard';
import { connect } from "react-redux";
import agent from "../../agent"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const leftTop = { latitude: 31.02756, longitude: 121.42290 }
const rightTop = { latitude: 31.03500, longitude: 121.44600 }
const leftBottom = { latitude: 31.01630, longitude: 121.42780 }
const rightBottom = { latitude: 31.02375, longitude: 121.45096 }
const center = { latitude: 31.02411, longitude: 121.43509 }

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 58,
    }
});

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});

const longitude = 121.436;
const latitude = 31.022;

export class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: []
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const response = await agent.hean.getPoints(uId, token, longitude, latitude, "all", "all");   // modify location to actual values
        if (response.rescode === 0) {
            response.heans.forEach(hean => hean.longitude = hean.longtitude);
            this.setState({ heans: response.heans })
        }
    }

    componentWillMount() {
        this.updateState();
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.updateState();
        }
    }

    // 目前的 <HeanCard /> 会立刻渲染，即实际上获取卡片形式的函的请求不会被延迟到点击 point 之后再发送
    render() {
        return (
            <React.Fragment>
                <MapView
                    style={styles.map}
                    showsZoomControls={false}
                    zoomLevel={16.5}
                    coordinate={center}
                    showsIndoorMap
                    showsIndoorSwitch
                    showsScale
                >
                    {this.state.heans.map(hean => (
                        <Marker
                            coordinate={{ latitude: hean.latitude, longitude: hean.longitude }}
                            image='flag'
                        >
                            <View style={{ width: 300, height: 280, borderWidth: 0, borderRadius: 0 }}>
                                <HeanCard hId={hean.hId} navigation={this.props.navigation} />
                            </View>
                        </Marker>
                    ))}
                    <Marker
                        coordinate={{ latitude: latitude, longitude: longitude }}
                        color="red"
                        image='flag'
                    />

                    {/* border */}
                    <Polyline
                        coordinates={[leftTop, rightTop, rightBottom, leftBottom, leftTop]}
                        width={2}
                        color="purple"
                        dashed
                    />
                </MapView>
            </React.Fragment>
        );
    }
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(MapScreen));
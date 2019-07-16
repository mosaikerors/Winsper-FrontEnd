import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';


export default class Draggable extends Component {
    componentWillMount() {
        this.state.pan.addListener((c) => this.state._value = c);
    }
    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }
    constructor(props) {
        super(props);
        const { pressDragRelease, reverse, onMove } = props;
        this.state = {
            pan: new Animated.ValueXY(),
            _value: {
                x: 0,
                y: 0
            }
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
                this.state.pan.setValue({ x: 0, y: 0 });
                console.log("grant!!")
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.flattenOffset();
                console.log("release!!")
            }
        });
    }

    _positionCss = () => {
        let Window = Dimensions.get('window');
        const { renderSize, offsetX, offsetY, x, y, z } = this.props;
        return {
            position: 'absolute',
            //width: Window.width,
            //height: Window.height,
            top: 200,
            left: 200
        }
    }

    _dragItemCss = () => {
        const { renderShape, renderSize, renderColor } = this.props;
        return {
            backgroundColor: "cyan",
            width: 50,
            height: 50,
            borderRadius: 0
        }
    }

    render() {
        console.log("render")
        return (
            <View style={this._positionCss()}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[this.state.pan.getLayout()]}
                >
                    <TouchableOpacity
                        style={this._dragItemCss()}
                    >
                        <Text>123</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

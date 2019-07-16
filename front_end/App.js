import React from 'react';
import { Button, View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';

class D extends React.Component {
    constructor(props) {
        super(props);
        //const { pressDragRelease, reverse, onMove } = props;
        this.state = {
            pan: new Animated.ValueXY(),
            _value: {
                x: 0,
                y: 0
            },
            height: 100,
            width: 100,
            storedHeight: 100,
            storedWidth: 100,
            rotate: 0,
            storedRotate: 0
        };

        this.getStyle = this.getStyle.bind(this);
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
                this.state.pan.setValue({ x: 0, y: 0 });
                //console.log(Object.keys(this.state.pan.x))
                //console.log(this.state.pan.x._value)
                //console.log(this.state.pan.x._offset)
                console.log("grant1!!")
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.flattenOffset();
                console.log("release1!!")
            }
        });

        this.panResponder2 = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {

                console.log("grant2!!")
            },
            onPanResponderMove: (e, gestureState) => {
                //console.log("AA: " + e.nativeEvent.pageX)
                //console.log("BB: " + e.nativeEvent.pageY)
                //console.log("CC: " + gestureState.dx)
                //console.log("DD: " + gestureState.dy)
                this.setState((prevState => ({
                    height: this.state.storedHeight + gestureState.dy,
                    width: this.state.storedWidth + gestureState.dx
                })))
            },
            onPanResponderRelease: (e, gestureState) => {
                this.setState({
                    storedHeight: this.state.height,
                    storedWidth: this.state.width
                })
                console.log("release2!!")
            }
        });

        this.panResponder3 = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {

                console.log("grant2!!")
            },
            onPanResponderMove: (e, gestureState) => {
                this.setState((prevState => ({
                    rotate: this.state.storedRotate + gestureState.dx
                })))
            },
            onPanResponderRelease: (e, gestureState) => {
                this.setState({
                    storedRotate: this.state.rotate
                })
                console.log("release2!!")
            }
        });
    }
    componentWillMount() {
        this.state.pan.addListener((c) => this.state._value = c);
    }
    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }

    getStyle() {
        console.log(this.state.height)
        console.log(this.state.width)
        return {
            backgroundColor: "cyan",
            height: this.state.height,
            width: this.state.width,
            borderWidth: 1,
            transform: [{ rotate: `${this.state.rotate}deg` }]
        }
    }

    render() {
        console.log("render")
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    <View style={{ position: "absolute", top: 200, left: 200 }} >
                        <Animated.View
                            {...this.panResponder.panHandlers}
                            style={[this.state.pan.getLayout()]}
                        >
                            <TouchableOpacity style={{ backgroundColor: "green", height: 20, width: 20, borderWidth: 1 }}>

                            </TouchableOpacity>
                            <TouchableOpacity style={this.getStyle()}>
                                <Text>
                                    TBC
                        </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>


                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <View style={{flex:1}}>
                            <Animated.View {...this.panResponder2.panHandlers}>
                                <TouchableOpacity style={{
                                    backgroundColor: "cyan",
                                    height: 200,
                                    width: 200
                                }}>
                                    <Text>
                                        缩放
                            </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <View style={{ flexDirection: "row-reverse" }}>
                            <Animated.View {...this.panResponder3.panHandlers}>
                                <TouchableOpacity style={{
                                    backgroundColor: "violet",
                                    height: 200,
                                    width: 200
                                }}>
                                    <Text>
                                        旋转
                            </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}

export default D;
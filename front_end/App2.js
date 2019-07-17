import React from 'react';
import { Button, View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';

const rt = (a, b) => Math.sqrt(a * a + b * b)
const judgeClockWise = (x, y, rawTheta) => {
    const theta = rawTheta < 0 ? rawTheta + Math.PI * 2 : rawTheta
    if (theta > Math.PI * 1.5 || theta < Math.PI * 0.5) {
        if (-(Math.tan(theta)) * x < y)
            return true;
        return false;
    }
    if (-(Math.tan(theta)) * x < y)
        return false;
    return true;
}
const unify = (radian) => {
    let unifiedRadian = radian % (Math.PI * 2)
    if (unifiedRadian < 0)
        unifiedRadian += Math.PI * 2
    return unifiedRadian;
}
class D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: { x: 200, y: 200 },
            storedPos: { x: 200, y: 200 },
            size: { height: 100, width: 100 },
            scale: 1,
            storedScale: 1,
            rotate: 0,
            storedRotate: 0
        };

        this.getStyle = this.getStyle.bind(this);
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) =>
                this.setState({
                    pos: { x: this.state.storedPos.x + gestureState.dx, y: this.state.storedPos.y + gestureState.dy }
                }),
            onPanResponderRelease: () => this.setState({ storedPos: this.state.pos })
        });

        this.panResponder2 = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const scaleX = (this.state.storedScale * this.state.size.width + gestureState.dx) / this.state.size.width;
                const scaleY = (this.state.storedScale * this.state.size.height + gestureState.dy) / this.state.size.height;
                this.setState({
                    scale: scaleX < scaleY ? scaleX : scaleY
                })
            },
            onPanResponderRelease: () => this.setState({ storedScale: this.state.scale })
        });

        this.panResponder3 = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const { height, width } = this.state.size;
                const { dx, dy } = gestureState;
                const before = rt(height * this.state.storedScale / 2, width * this.state.storedScale / 2);
                const theta = unify(Math.atan(height / width) - this.state.storedRotate);
                const after = rt(before * Math.cos(theta) + dx, -before * Math.sin(theta) + dy);
                const link = rt(dx, dy);
                const isClockWise = judgeClockWise(before * Math.cos(theta) + dx, -before * Math.sin(theta) + dy, theta);
                const absRotate = Math.acos((before * before + after * after - link * link) / (2 * before * after));
                const rotate = isClockWise ? absRotate : -absRotate;
                this.setState({ rotate: unify(this.state.storedRotate + rotate) })
            },
            onPanResponderRelease: () => this.setState({ storedRotate: this.state.rotate })
        });
    }

    getStyle() {
        return {
            position: "absolute",
            top: this.state.pos.y,
            left: this.state.pos.x,
            height: this.state.size.height * this.state.scale,
            width: this.state.size.width * this.state.scale,
            borderWidth: 1,
            transform: [{ rotate: `${this.state.rotate * 180 / Math.PI}deg` }]
        }
    }

    render() {
        //console.log("render")
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: "column" }}>

                    <View style={this.getStyle()}>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row-reverse", flex: 1 }} {...this.panResponder3.panHandlers}>
                                <TouchableOpacity style={{ backgroundColor: "violet", height: 30, width: 30 }} />
                            </View>
                        </View>

                        <View style={{ borderWidth: 1, marginLeft: 30, marginRight: 30, flex: 1 }} {...this.panResponder.panHandlers}>
                            <TouchableOpacity>
                                <Text>
                                    TBC
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ backgroundColor: "red", height: 30, width: 30 }} />
                            </View>
                            <View style={{ flexDirection: "row-reverse" }} {...this.panResponder2.panHandlers}>
                                <TouchableOpacity style={{ backgroundColor: "cyan", height: 30, width: 30 }} />
                            </View>
                        </View>

                    </View>


                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
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
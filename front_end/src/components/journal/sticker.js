import React from 'react';
import { Button, View, Text, PanResponder, Animated, TouchableOpacity, Image } from 'react-native';

const rt = (a, b) => Math.sqrt(a * a + b * b)

// judge whether the rotate angle is greater than pi or not
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

// unify radian value to [0, 2*pi)
const unify = (radian) => {
    let unifiedRadian = radian % (Math.PI * 2)
    if (unifiedRadian < 0)
        unifiedRadian += Math.PI * 2
    return unifiedRadian;
}

class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: { x: 200, y: 200 },
            storedPos: { x: 200, y: 200 },
            scale: 1,
            storedScale: 1,
            rotate: 0,
            storedRotate: 0
        };

        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getContentStyle = this.getContentStyle.bind(this);
        this.dragResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) =>
                this.setState({
                    pos: { x: this.state.storedPos.x + gestureState.dx, y: this.state.storedPos.y + gestureState.dy }
                }),
            onPanResponderRelease: () => this.setState({ storedPos: this.state.pos })
        });

        this.scaleResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const scaleX = (this.state.storedScale * this.props.width + gestureState.dx) / this.props.width;
                const scaleY = (this.state.storedScale * this.props.height + gestureState.dy) / this.props.height;
                this.setState({
                    scale: scaleX < scaleY ? scaleX : scaleY
                })
            },
            onPanResponderRelease: () => this.setState({ storedScale: this.state.scale })
        });

        this.rotateResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const { height, width } = this.props;
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

    getContainerStyle() {
        return {
            position: "absolute",
            top: this.state.pos.y - (this.state.scale - 1) / 2 * this.props.height,
            left: this.state.pos.x - (this.state.scale - 1) / 2 * this.props.width,
            borderWidth: 1,
            transform: [{ rotate: `${this.state.rotate * 180 / Math.PI}deg` }]
        }
    }
    getContentStyle() {
        return {
            borderWidth: 1,
            marginLeft: 30,
            marginRight: 30,
            flex: 1,
            justifyContent: "center",
            height: this.props.height * this.state.scale,
            width: this.props.width * this.state.scale,
        }
    }

    render() {
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: "column" }}>

                    <View style={this.getContainerStyle()}>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row-reverse", flex: 1 }} {...this.rotateResponder.panHandlers}>
                                <TouchableOpacity style={{ backgroundColor: "violet", height: 30, width: 30 }} />
                            </View>
                        </View>

                        <View style={this.getContentStyle()} {...this.dragResponder.panHandlers}>
                            <TouchableOpacity>
                                {this.props.source ?
                                    <Image source={this.props.source} style={[{
                                        //position: "relative",
                                        top: (this.state.scale - 1) * this.props.height / 2,
                                        left: (this.state.scale - 1) * this.props.width / 2,
                                        transform: [{ scale: this.state.scale }]
                                    }]} /> :
                                    <View style={{ justifyContent: "center", alignItems: "center"}}>
                                        <Text>{this.props.text}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ backgroundColor: "red", height: 30, width: 30 }} />
                            </View>
                            <View style={{ flexDirection: "row-reverse" }} {...this.scaleResponder.panHandlers}>
                                <TouchableOpacity style={{ backgroundColor: "cyan", height: 30, width: 30 }} />
                            </View>
                        </View>

                    </View>
                </View>
            </React.Fragment>
        )
    }
}

export default Sticker;
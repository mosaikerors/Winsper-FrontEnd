import React from 'react';
import { Button, View, Text, PanResponder, Animated, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

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
            pos: { x: 0, y: 0 },
            storedPos: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            storedScale: { x: 1, y: 1 },
            rotate: 0,
            storedRotate: 0,
            onFocused: false,
            isDeleted: false,
        };

        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getContentStyle = this.getContentStyle.bind(this);
        this.getControlStyle = this.getControlStyle.bind(this);
        this.dragResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => this.state.onFocused ? true : false,
            onMoveShouldSetPanResponderCapture: () => this.state.onFocused ? true : false,
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
                const scaleX = (this.state.storedScale.x * this.props.width + gestureState.dx) / this.props.width;
                const scaleY = (this.state.storedScale.y * this.props.height + gestureState.dy) / this.props.height;
                if (this.props.source)
                    this.setState({ scale: { x: Math.min(scaleX, scaleY), y: Math.min(scaleX, scaleY) } })
                else
                    this.setState({ scale: { x: scaleX, y: scaleY } })
            },
            onPanResponderRelease: () => this.setState({ storedScale: this.state.scale })
        });

        this.rotateResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const { height, width } = this.props;
                const { dx, dy } = gestureState;
                const before = rt(height * this.state.storedScale.y / 2, width * this.state.storedScale.x / 2);
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
            position: this.state.isDeleted ? "relative" : "absolute",
            top: this.state.pos.y - (this.state.scale.y - 1) / 2 * this.props.height,
            left: this.state.pos.x - (this.state.scale.x - 1) / 2 * this.props.width,
            //borderWidth: 1,
            transform: [{ rotate: `${this.state.rotate * 180 / Math.PI}deg` }],
            zIndex: this.props.zIndex,
            display: this.state.isDeleted ? "none" : "flex"
        }
    }
    getContentStyle() {
        return {
            borderWidth: this.state.onFocused ? 1 : 0,
            borderStyle: "dotted",
            marginLeft: 30,
            marginRight: 30,
            flex: 1,
            //justifyContent: "center",
            height: this.props.height * this.state.scale.y,
            width: this.props.width * this.state.scale.x,
        }
    }

    getControlStyle(field) {
        let color;
        switch (field) {
            case "group":
                return {
                    width: "100%",
                    flexDirection: "row",
                    //display: this.state.onFocused ? "flex" : "none"
                    opacity: this.state.onFocused ? 1 : 0
                }
            case "delete":
                color = "red"; break;
            case "rotate":
                color = "violet"; break;
            case "save":
                color = "green"; break;
            case "scale":
                color = "cyan"; break;
        }
        return {
            backgroundColor: color,
            height: 30,
            width: 30,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center"
        }
    }

    render() {
        return (
            <React.Fragment>
                <View style={[this.getContainerStyle()]}>
                    <View style={this.getControlStyle("group")}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={this.getControlStyle("delete")}
                                onPress={() => this.setState({ isDeleted: true })}
                                disabled={this.state.onFocused ? false : true}
                            >
                                <FontAwesome name={"trash"} size={16} color={"white"} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row-reverse" }} {...this.rotateResponder.panHandlers}>
                            <TouchableOpacity style={this.getControlStyle("rotate")} disabled={this.state.onFocused ? false : true}>
                                <FontAwesome name={"repeat"} size={16} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[this.getContentStyle()]} {...this.dragResponder.panHandlers}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center" }}
                            onPress={() => this.setState({ onFocused: !this.state.onFocused })}
                        >
                            {this.props.source ?
                                <Image source={this.props.source} style={[{
                                    position: "absolute",
                                    top: (this.state.scale.y - 1) * this.props.height / 2,
                                    left: (this.state.scale.x - 1) * this.props.width / 2,
                                    width: this.props.width, height: this.props.height,
                                    transform: [{ scale: this.state.scale.x }],
                                    //zIndex: this.state.onFocused ? 9999 : 0
                                }]} /> :
                                <Text style={{
                                    //height: this.props.height * this.state.scale.y,
                                    //width: this.props.width * this.state.scale.x,
                                    fontSize:24
                                }}>
                                    {this.props.text}
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={this.getControlStyle("group")}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={this.getControlStyle("save")}
                                onPress={() => this.setState({ onFocused: false })}
                                disabled={this.state.onFocused ? false : true}
                            >
                                <FontAwesome name={"check"} size={16} color={"white"} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row-reverse" }} {...this.scaleResponder.panHandlers}>
                            <TouchableOpacity style={this.getControlStyle("scale")} disabled={this.state.onFocused ? false : true}>
                                <FontAwesome5 name={"expand-arrows-alt"} size={16} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </React.Fragment>
        )
    }
}

export default Sticker;
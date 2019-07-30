import React from "react";
import { Text, View, StyleSheet,ScrollView } from "react-native";
import { ListItem } from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator';

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const customStyles = {
    stepIndicatorSize: 1,   // 每一步的圈圈的大小
    currentStepIndicatorSize: 20,  // 当前步圈圈大小

    separatorStrokeWidth: 2,   // 时间轴线条宽度

    stepStrokeWidth: 10,   // 每一步圈圈边缘宽度
    currentStepStrokeWidth: 3,   // 当前步圈圈边缘宽度

    stepStrokeCurrentColor: 'cyan',  // 当前步圈圈边缘颜色
    stepStrokeFinishedColor: 'cyan',
    stepStrokeUnFinishedColor: '#aaaaaa',

    separatorFinishedColor: 'green',  // 时间轴线条颜色
    separatorUnFinishedColor: '#aaaaaa',

    stepIndicatorFinishedColor: 'cyan',
    stepIndicatorUnFinishedColor: 'red',
    stepIndicatorCurrentColor: 'cyan',

    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,

    stepIndicatorLabelCurrentColor: 'green',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',

    labelColor: '#999999',
    labelSize: 20,
    currentStepLabelColor: 'red'
}


class DiaryScreen extends React.Component {
    static navigationOptions = {
        title: "我的日记"
    };
    render() {
        return (
            <React.Fragment>
                <View style={{marginLeft:20,borderWidth: 1,height:'100%'}}>
                    <StepIndicator
                        customStyles={customStyles}
                        direction="vertical"
                        stepCount={5}
                        currentPosition={4}
                        labels={labels}
                        renderStepIndicator={(step) => <Text></Text>}
                        renderLabel={(z,x,c,v)=>(<View style={{height:500,borderWidth:1}}><Text>123</Text></View>)}
                    />
                </View>
            </React.Fragment>
        );
    }
}
export default DiaryScreen;
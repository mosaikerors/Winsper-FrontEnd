import React from 'react'
import { Text, StyleSheet,View } from 'react-native'

const styles = StyleSheet.create({
    arrow: {
        height: 20,
        width: 20,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        zIndex: 2,
        position: "relative",
        top: 24,
        transform: [{ rotate: "45deg" }]
    },
    linkLine: {
        height: 80,
        width: 0,
        position: "relative",
        left: 10,
        borderLeftWidth: 1
    },
    timeNode: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: "cyan"
    }
});

class TimeAxis extends React.Component {
    render() {
        // num 为日记数量，即时间节点的个数
        const { num } = this.props;
        if (num === 0)
            return null;
        // construct nodes array
        let nodes = []
        for (let i = 0; i < num - 1; i++)
            nodes.push(1)
        return (
            <React.Fragment>
                <View style={{ marginLeft:80, width:30,marginBottom:30 }}>
                    <View style={styles.arrow} />
                    <View style={[styles.linkLine, { height: 60 }]} />
                    <View style={styles.timeNode} />
                    {nodes.map(node => (
                        <View>
                            <View style={styles.linkLine} />
                            <View style={styles.timeNode} />
                        </View>
                    ))}
                </View>
            </React.Fragment>
        )
    }
}
export default TimeAxis;
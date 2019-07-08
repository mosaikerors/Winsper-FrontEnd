import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

class DetailedBlock extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Card containerStyle={{ flexDirection: 'column' }}>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Message')}>
                                <Text>
                                    消息
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => { console.log(1); this.props.navigation.navigate('HeanList') }}>
                                <Text>
                                    函
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Collection')}>
                                <Text>
                                    收藏
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Diary')}>
                                <Text>
                                    日记
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Journal')}>
                                <Text>
                                    手账
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Submission')}>
                                <Text>
                                    投稿
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('MoodReport')}>
                                <Text>
                                    心情报表
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Comment')}>
                                <Text>
                                    评论
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </React.Fragment>
        );
    }
}
export default DetailedBlock;
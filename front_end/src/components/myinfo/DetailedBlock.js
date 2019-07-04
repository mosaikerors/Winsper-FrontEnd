import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center'
    }
})

class DetailedBlock extends React.Component {
    render() {
        return (
            <View>
                <Card containerStyle={{ flexDirection: 'column' }}>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <Text>
                                消息
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                函
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                收藏
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                日记
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <Text>
                                手账
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                投稿
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                心情报表
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text>
                                评论
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
}
export default DetailedBlock;
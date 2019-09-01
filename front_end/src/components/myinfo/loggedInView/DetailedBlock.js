import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from 'react-native-elements'
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        //borderWidth: 1,
        margin: 5,
        borderRadius: 5,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});

const mapStateToProps = state => ({
    uId: state.user.uId,
    hasNewMessage: state.message.hasNewMessage
})

class DetailedBlock extends React.Component {
    render() {
        const { isMe, privacy, hasNewMessage } = this.props;
        const otherUId = isMe ? this.props.uId : this.props.otherUId;
        return (
            <React.Fragment>
                <Card containerStyle={{ flexDirection: 'column' }}>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isMessagePublic}
                                style={styles.text}
                                onPress={() => this.props.navigation.push('MessageList')}
                            >
                                <FontAwesome name={"comment-o"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>消息</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isHeanPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('HeanList', { otherUId })}
                            >
                                <FontAwesome name={"envelope-o"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>函</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isCollectionPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Collection', { otherUId })}
                            >
                                <FontAwesome name={"star-o"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>收藏</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isDiaryPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('DiaryList', { otherUId })}
                            >
                                <FontAwesome name={"calendar-o"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>日记</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isJournalPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('JournalList', { otherUId })}
                            >
                                <Ionicons name={"ios-journal"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>手账</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isSubmissionPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Submission', { otherUId })}
                            >
                                <Ionicons name={"ios-paper-plane"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>投稿</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isMoodReportPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('MoodReport', { otherUId })}
                            >
                                <MaterialCommunityIcons name={"file"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>心情报表</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isCommentPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Comment', { otherUId })}
                            >
                                <MaterialCommunityIcons name={"comment"} size={26} />
                                <Text style={{ fontSize: 18, marginTop: 5 }}>评论</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(DetailedBlock);
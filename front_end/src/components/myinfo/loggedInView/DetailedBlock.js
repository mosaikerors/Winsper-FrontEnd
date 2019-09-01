import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from 'react-native-elements'
import { connect } from "react-redux"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        borderWidth: 1,
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
                                <Text>
                                    消息
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isHeanPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('HeanList', { otherUId })}
                            >
                                <Text>
                                    函
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isCollectionPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Collection', { otherUId })}
                            >
                                <Text>
                                    收藏
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isDiaryPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('DiaryList', { otherUId })}
                            >
                                <Text>
                                    日记
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row' }}>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isJournalPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('JournalList', { otherUId })}
                            >
                                <Text>
                                    手账
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isSubmissionPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Submission', { otherUId })}
                            >
                                <Text>
                                    投稿
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isMoodReportPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('MoodReport', { otherUId })}
                            >
                                <Text>
                                    心情报表
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity
                                disabled={!isMe && !privacy.isCommentPublic}
                                style={styles.text} onPress={() => this.props.navigation.push('Comment', { otherUId })}
                            >
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
export default connect(mapStateToProps)(DetailedBlock);
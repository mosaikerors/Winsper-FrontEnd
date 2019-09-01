import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Divider } from "react-native-elements"
import { connect } from "react-redux"
import agent from "../../../agent/index"
import { transformDate } from "../../../util"
import Loading from "../../../components/Loading"

const renderCommentBubble = comment => (
    <View>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                {comment.isComment ?
                    <Text style={{ fontSize: 24 }}>评论了 <Text>{comment.username}</Text> 的函</Text> :
                    <Text style={{ fontSize: 24 }}>回复 <Text>{comment.username}</Text> 的评论</Text>
                }
            </View>
            <View style={{ justifyContent: "flex-end" }}>
                <Text>{transformDate(comment.time, true)}</Text>
            </View>
        </View>
        <Divider style={{ margin: 10, width: "100%", position: "relative", right: 10 }} />
        <Text style={{ fontSize: 16 }}>{comment.content}</Text>
    </View>
)

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class CommentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.hean.getComment(uId, token, uId);
        if (response.rescode === 0)
            this.setState({ comments: response.comments })

        // 点击 comment 会跳转到 heanDetail，而跳转到 heanDetail 之前必须要先拿到 heanCard
        // 在这里可以用 state 里的 comment，尽管从道理上讲 setState 应该被推迟到 render 前一刻再执行，
        // 但是有可能 RN 做了优化？在 render 之前用到了 state 的值就会提前执行 setState？
        let comments = this.state.comments;
        // 下一行的 await 是必需的，否则 forEach 之后的代码会在 comments 更新之前被执行
        await comments.forEach(async comment => {
            const tmp = await agent.hean.getHeanCard(uId, token, comment.hId);
            if (tmp.rescode === 0)
                comment.heanCard = tmp.heanCard
        });
        this.setState({ comments })

    }

    render() {
        const { comments } = this.state;
        if (!comments)
            return <Loading />
        return (
            <React.Fragment>
                <ScrollView>
                    {comments.map((comment) => (
                        <View style={{
                            marginLeft: 40, marginRight: 40, marginTop: 20, marginBottom: 20,
                            borderWidth: 1, borderRadius: 50, padding: 20
                        }}>
                            {/* comment content */}
                            <TouchableOpacity onPress={() => this.props.navigation.push("HeanDetail", { heanCard: comment.heanCard })} >
                                <View>
                                    {renderCommentBubble(comment)}
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(CommentScreen);
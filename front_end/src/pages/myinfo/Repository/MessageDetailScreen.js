import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import agent from "../../../agent/index"

// 渲染出 username 锚点，点击跳转到该用户个人主页
const renderUsername = (navigation, uId, username) => (
    <Text style={{ color: "blue" }} onPress={() => navigation.push("PersonPage", { uId })}>
        {username}
    </Text>
)

// 渲染出 hean 锚点，点击跳转到该函的详细页面
const renderHean = (navigation, heanCard, type) => (
    <Text style={{ color: "blue" }} onPress={() => navigation.push("HeanDetail", { heanCard })}>
        {type === 5 ? "评论" : (type === 6 ? "投稿" : "函")}
    </Text>
)

const getDetailedMessage = (type, message, navigation) => {
    console.log("message: " + Object.keys(message))
    if (type === 1)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.uId, message.username)} 关注了你
            </Text>
        );
    if (type === 2)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.uId, message.username)} 觉得你的
                {renderHean(navigation, message.heanCard, type)}很赞
            </Text>
        );
    if (type === 3)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.uId, message.username)} 收藏了你的
                {renderHean(navigation, message.heanCard, type)}
            </Text>
        );
    if (type === 4) {
        console.log(Object.keys(message))
        return (
            <View>
                <Text style={{ fontSize: 24 }}>
                    {renderUsername(navigation, message.uId, message.username)} 评论了你的
                    {renderHean(navigation, message.heanCard, type)}
                </Text>
                <Text>
                    {message.text}
                </Text>
            </View>
        );
    }
    if (type === 5)
        return (
            <View>
                <Text style={{ fontSize: 24 }}>
                    {renderUsername(navigation, message.uId, message.username)} 回复了你的
                    {renderHean(navigation, message.heanCard, type)}
                </Text>
                <Text>
                    {message.text}
                </Text>
            </View>
        );
    if (type === 6)
        return (
            <Text style={{ fontSize: 24 }}>
                你的 {renderHean(navigation, message.heanCard, type)} 被选中了
            </Text>
        );
}

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class MessageDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam("type", 0),
            messages: []
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const { type } = this.state;
        const response = await agent.record.getMessageDetail(uId, token, type)
        if (response.rescode === 0) {
            this.setState({ messages: response.messages })
        }

        // 这类 type 需要跳转到 heanDetail，而跳转到 heanDetail 之前必须要先拿到 heanCard
        if (type >= 2 && type <= 6) {
            // 在这里可以用 state 里的 message，尽管从道理上讲 setState 应该被推迟到 render 前一刻再执行，
            // 但是有可能 RN 做了优化？在 render 之前用到了 state 的值就会提前执行 setState？
            let messages = this.state.messages;
            // 下一行的 await 是必需的，否则 forEach 之后的代码会在 messages 更新之前被执行
            await messages.forEach(async message => {
                const tmp = await agent.hean.getHeanCard(uId, token, message.hId);
                if (tmp.rescode === 0)
                    message.heanCard = tmp.heanCard
            });
            this.setState({ messages })
        }
    }

    render() {
        const { type, messages } = this.state;
        return (
            <React.Fragment>
                <View>
                    {messages.map((message) => (
                        <View style={{ margin: 20, marginBottom: 10 }}>
                            {/* timestamp */}
                            <View style={{ alignSelf: "center" }}>
                                <Text>{message.time}</Text>
                            </View>

                            {/* message content */}
                            <View style={{ padding: 15, borderWidth: 1, borderRadius: 50}}>
                                {getDetailedMessage(type, message, this.props.navigation)}
                            </View>
                        </View>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(MessageDetailScreen);
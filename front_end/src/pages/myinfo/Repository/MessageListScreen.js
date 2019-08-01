import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Badge, Divider } from 'react-native-elements'
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import agent from "../../../agent/index";

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const messageIcons = [
    <SimpleLineIcons name={"user-follow"} size={20} />,
    <AntDesign name={"like2"} size={20} />,
    <Feather name={"star"} size={20} />,
    <FontAwesome name={"comment-o"} size={20} />,
    <FontAwesome name={"commenting-o"} size={20} />,
    <FontAwesome name={"envelope-o"} size={20} />
]

const getBriefMessage = (message) => {
    if (message.type === 1)
        return `${message.username} 关注了你`;
    if (message.type === 2)
        return `${message.username} 觉得你的函很赞`;
    if (message.type === 3)
        return `${message.username} 收藏了你的函`;
    if (message.type === 4)
        return `${message.username} 评论了你的函`;
    if (message.type === 5)
        return `${message.username} 回复了你的评论`;
    if (message.type === 6)
        return `你的投稿被选中了`;
}

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class MessageListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.readAll = this.readAll.bind(this)
    }

    async readAll() {
        const { uId, token } = this.props;
        const response = await agent.record.readAll(uId, token);
        if (response.rescode === 0) {
            let messages = this.state.messages;
            messages.forEach(message => {
                message.hasRead = true
            });
            this.setState({ messages })
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.record.getMessageList(uId, token);
        console.log(response)
        if (response.rescode === 0)
            this.setState({ messages: response.messages })
    }

    render() {
        const { messages } = this.state;
        return (
            <React.Fragment>
                <View style={{ borderWidth: 0, margin: 5, flexDirection: "row-reverse" }}>
                    <TouchableOpacity style={{ borderWidth: 0, flexDirection: "row" }}
                        onPress={this.readAll}
                    >
                        <FontAwesome name={"check"} size={24} color="green" />
                        <Text style={{ fontSize: 20 }}>全部已读</Text>
                    </TouchableOpacity>
                </View>
                <Divider />
                <View style={{ borderWidth: 0 }}>
                    {messages.map((message, index) => (
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.push("MessageDetail", { type: message.type })}>
                                <ListItem
                                    key={index}
                                    leftIcon={messageIcons[message.type - 1]}
                                    title={getBriefMessage(message)}
                                    titleStyle={{ fontSize: 20 }}
                                    subtitle={message.time}
                                    subtitleStyle={{ fontSize: 12 }}
                                    rightIcon={message.hasRead || <Badge />}
                                />
                            </TouchableOpacity>
                            <Divider />
                            <Divider />
                            <Divider />
                        </View>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(MessageListScreen);
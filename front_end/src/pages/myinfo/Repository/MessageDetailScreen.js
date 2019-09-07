import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import agent from "../../../agent/index"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from "../../../components/Loading"
import EmptyList from "../../../components/EmptyList"
import theme from "../../../theme"

// 渲染出 username 锚点，点击跳转到该用户个人主页
const renderUsername = (navigation, uId, username) => (
    <Text style={{ color: "blue" }} onPress={() => navigation.push("PersonPage", { uId })}>
        {username}
    </Text>
)

const getDetailedMessage = (type, message, navigation) => {
    if (type === 1)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.senderUId, message.senderUsername)} 关注了你
            </Text>
        );
    if (type === 2)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.senderUId, message.senderUsername)} 觉得你的函很赞
            </Text>
        );
    if (type === 3)
        return (
            <Text style={{ fontSize: 24 }}>
                {renderUsername(navigation, message.senderUId, message.senderUsername)} 收藏了你的函
            </Text>
        );
    if (type === 4) {
        console.log(Object.keys(message))
        return (
            <View>
                <Text style={{ fontSize: 24 }}>
                    {renderUsername(navigation, message.senderUId, message.senderUsername)} 评论了你的函
                </Text>
                <Text>
                    {message.text}
                </Text>
            </View>
        );
    }
    if (type === 5)
        return (
            <Text style={{ fontSize: 24 }}>
                你的投稿被选中了
            </Text>
        );
    if (type === 6)
        return (
            <Text style={{ fontSize: 24 }}>{message.text}</Text>
        )
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
            messages: null
        }
        this.deleteMessage = this.deleteMessage.bind(this)
        this.updateState = this.updateState.bind(this)
    }


    async updateState() {
        const { uId, token } = this.props;
        const { type } = this.state;
        const response = await agent.record.getMessageDetail(uId, token, type)
        response.messages.forEach(message => agent.record.readSingleMessage(uId, token, message.messageId))

        this.setState({ messages: response.messages })

    }

    async deleteMessage() {
        const { uId, token } = this.props;
        const { type } = this.state;
        const response = await agent.record.deleteMessage(uId, token, type)
        this.setState({ messages: [] })
    }

    componentWillMount() {
        this.updateState()
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.updateState();
        }
    }

    render() {
        const { type, messages } = this.state;
        if (!messages)
            return <Loading />;
        if (messages.length === 0)
            return <EmptyList field="消息列表" />
        return (
            <React.Fragment>
                <View style={{ height: 40, borderWidth: 0, flexDirection: "row-reverse", backgroundColor: theme.palette.sky[0] }}>
                    <TouchableOpacity style={{ borderWidth: 0, flexDirection: "row", alignItems: "center" }}
                        onPress={this.deleteMessage}
                    >
                        <FontAwesome name={"trash"} size={24} />
                        <Text style={{ fontSize: 24, marginHorizontal: 5 }}>清空</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: theme.palette.sky[0] }}>
                    {messages.map((message) => (
                        <View style={{ margin: 20, marginBottom: 10 }}>
                            {/* timestamp */}
                            <View style={{ alignSelf: "center" }}>
                                <Text>{message.time}</Text>
                            </View>

                            {/* message content */}
                            <View style={{ padding: 15, borderWidth: 1, borderRadius: 50 }}>
                                {getDetailedMessage(type, message, this.props.navigation)}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps)(MessageDetailScreen));
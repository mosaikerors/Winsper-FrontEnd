import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Badge, Divider } from 'react-native-elements'
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import agent from "../../../agent/index";
import Loading from "../../../components/Loading"

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
        return `${message.senderUsername} 关注了你`;
    if (message.type === 2)
        return `${message.senderUsername} 觉得你的函很赞`;
    if (message.type === 3)
        return `${message.senderUsername} 收藏了你的函`;
    if (message.type === 4)
        return `${message.senderUsername} 评论了你的函`;
    if (message.type === 5)
        return `你的投稿被选中了`;
}

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    onReadMessage: () =>
        dispatch({ type: "READ_MESSAGE" })
})

class MessageListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null
        }
        this.readAll = this.readAll.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    async updateState() {
        const { uId, token } = this.props;
        const response = await agent.record.getMessageList(uId, token);

        if (response.rescode === 0)
            this.setState({ messages: response.messages })
        this.props.onReadMessage()
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
        const { messages } = this.state;
        if (!messages)
            return <Loading />;
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
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(MessageListScreen));
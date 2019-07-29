import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import agent from "../../../agent/index"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const getDetailedMessage = (type,message) => {
    if (type === 1)
        return `${message.username}关注了你`;
    if (type === 2)
        return `${message.username}觉得你的函很赞`;
    if (type === 3)
        return `${message.username}收藏了你的函`;
    if (type === 4)
        return `${message.username}评论了你的函`;
    if (type === 5)
        return `${message.username}回复了你的评论`;
    if (type === 6)
        return `你的投稿被选中了`;
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
        console.log(response)
        if (response.rescode === 0)
            this.setState({ messages: response.messages })
    }

    render() {
        const { type, messages } = this.state;
        return (
            <React.Fragment>
                <View>
                    {messages.map((message, index) => (
                        <View style={{ height: 220,  margin: 20, marginBottom: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <Text>{message.time}</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={{ height: 200, borderWidth: 1 }}>
                                    <Text>{getDetailedMessage(type,message)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(MessageDetailScreen);
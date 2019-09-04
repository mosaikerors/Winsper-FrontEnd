import { View, StyleSheet } from "react-native";
import { Avatar, Text, Divider } from "react-native-elements";
import React, { Component } from "react";
import { transformDate } from "../../util"
import theme from "../../theme"

const styles = StyleSheet.create({
    background:
    {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: theme.palette.sky[0]
    },
    top:
    {
        flexDirection: "row",
        alignItems: "center"
    },
    commenterInfo:
    {
        flexDirection: "column",
        marginLeft: 10
    },
    text: { lineHeight: 20 },
    reply: { color: "#2979ff" }
});

class Comment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { comment } = this.props;
        return (
            <View style={styles.background}>
                
                <View style={styles.top}>
                    <Avatar
                        rounded
                        size={"small"}
                        source={{ uri: comment.commenterAvatar }}
                    />
                    <View style={styles.commenterInfo}>
                        <Text>{comment.commenterUsername}</Text>
                        <Text>{transformDate(comment.time, true)}</Text>
                    </View>
                </View>
                <Text style={styles.text}>{comment.content}</Text>
                
            </View>
        )
    }
}

export default Comment;
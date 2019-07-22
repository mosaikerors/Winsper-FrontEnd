import {View, StyleSheet} from "react-native";
import {Avatar, Text} from "react-native-elements";
import React, {Component} from "react";

class Comment extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {comment}=this.props;
        return(
            <View style={styles.background}>
                <View style={styles.top}>
                    <Avatar
                        rounded
                        size={"small"}
                        source={{uri: comment.commenter.avatar}}
                    />
                    <View style={styles.commenterInfo}>
                        <Text>{comment.commenter.username}</Text>
                        <Text>{comment.time}</Text>
                    </View>
                </View>
                <Text style={styles.text}><Text style={styles.reply}>{comment.commented?"回复"+comment.commented.username+":":null}</Text>{comment.content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background:
    {
        paddingLeft:10,
        paddingRight:10,
        marginTop:5,
        marginBottom:5,
        backgroundColor:"#f5f5f5"
    },
    top:
    {
        flexDirection:"row",
        alignItems:"center"
    },
    commenterInfo:
    {
        flexDirection:"column",
        marginLeft:10
    },
    text: {lineHeight:20},
    reply:{color:"#2979ff"}
});

export default Comment;
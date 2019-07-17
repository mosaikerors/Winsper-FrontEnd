import React, {Component} from 'react';
import { View} from 'react-native';
import {Avatar, Text} from "react-native-elements";
const avatar = "https://images.pexels.com/photos/1374551/pexels-photo-1374551.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const comments = [
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "原谅我把冷寂的清官朝服剪成合身的寻日布衣，把你的一品丝绣" +
            "裁成放心事的暗袋，你娴熟的三行连韵与商簌体，到我手上变为缝缝补补的百衲图。" +
            "安静些，三月的鬼雨，我要翻箱倒箧，再裂一条无汗则拭泪的巾帕。"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "原谅我把冷寂的清官朝服剪成合身的寻日布衣，把你的一品丝绣" +
            "裁成放心事的暗袋，你娴熟的三行连韵与商簌体，到我手上变为缝缝补补的百衲图。" +
            "安静些，三月的鬼雨，我要翻箱倒箧，再裂一条无汗则拭泪的巾帕。"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    },
    {
        "commentId": "111",
        "commenter": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "commented": {
            "uId":1,
            "username":"username1",
            "avatar":avatar
        },
        "time": 20191214,
        "content": "nishuodedui"
    }
];

class Comment extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const {comment}=this.props;
        return(
            <View style={{ paddingLeft:10, paddingRight:10,
                            marginTop:5, marginBottom:5,
                            marginLeft:10, marginRight:10,
                            backgroundColor:"#f5f5f5"}}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Avatar
                        rounded
                        size={"small"}
                        source={{uri: comment.commenter.avatar}}
                    />
                    <View style={{flexDirection:"column"}}>
                        <Text style={{marginLeft:10}}>{comment.commenter.username}</Text>
                        <Text style={{marginLeft:10}}>{comment.time}</Text>
                    </View>
                </View>
                <Text style={{lineHeight:20}}><Text style={{color:"#2979ff"}}>{comment.commented?"回复"+comment.commented.username+":":null}</Text>{comment.content}</Text>
            </View>
        )
    }
}

export default class Comments extends Component{
    render(){
        return(
            <View>
                {
                    comments.map((item, i)=>{
                        return(<Comment comment={item}/>)
                    })
                }
            </View>
        )
    }
}
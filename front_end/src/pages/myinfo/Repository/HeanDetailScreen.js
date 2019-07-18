import React, { Component } from 'react';
import Comment from '../../../components/myinfo/Comment'
import {Avatar} from 'react-native-elements';
import {StyleSheet, KeyboardAvoidingView, View, Text, TextInput, Alert, ScrollView, TouchableOpacity} from 'react-native';
import ImageGroup from '../../../components/hean/ImageGroup';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
const avatar = "https://images.pexels.com/photos/1374551/pexels-photo-1374551.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const hean = {
    "hId": 1,
    "uId": 1,
    "avatar": avatar,
    "username": "username",
    "createdTime": 20191213,
    "text":"原谅我把冷寂的清官朝服剪成合身的寻日布衣，把你的一品丝绣" +
        "裁成放心事的暗袋，你娴熟的三行连韵与商簌体，到我手上变为缝缝补补的百衲图。" +
        "安静些，三月的鬼雨，我要翻箱倒箧，再裂一条无汗则拭泪的巾帕。",
    "pics": [
    avatar,avatar,avatar,avatar
    ],
    "hasLiked": true,
    "hasStarred": false,
    "likeCount": 100,
    "starCount": 100,
    "commentCount": 100,
    "comments":[
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
    ]
};
class HeanDetailScreen extends Component {
    static navigationOptions = {
        title: "函"
    };
    
    constructor(props) {
        super(props);
        this.state={
            comment:"",
            commentObject:0, // 0 : comment hean, 1: comment to comment
            commentToCommentId:0,
            likeCount: hean.likeCount,
            starCount: hean.likeCount,
            hasLiked: hean.hasLiked,
            hasStarred: hean.hasStarred,
            commentCount:hean.commentCount
        };
        this.changeText=this.changeText.bind(this);
        this.submitComment=this.submitComment.bind(this);
        this.changeLike=this.changeLike.bind(this);
        this.changeStar=this.changeStar.bind(this);
        this.commentHean=this.commentHean.bind(this);
        this.commentToComment = this.commentToComment.bind(this);
    };

    changeLike(){
        const {likeCount, hasLiked} = this.state;
        if(hasLiked){
            this.setState({
                likeCount:likeCount-1,
                hasLiked:!hasLiked
            })
        }
        else{
            this.setState({
                likeCount:likeCount+1,
                hasLiked:!hasLiked
            })
        }
    }

    changeStar(){
        const {starCount, hasStarred} = this.state;
        if(hasStarred){
            this.setState({
                starCount:starCount-1,
                hasStarred:!hasStarred
            })
        }
        else{
            this.setState({
                starCount:starCount+1,
                hasStarred:!hasStarred
            })
        }
    }

    changeText(comment){
        this.setState({
            comment
        })
    }

    submitComment(){
        if(this.state.comment!==""){
            if(this.state.commentObject===1){
                Alert.alert("comment to comment, comment ID = "+this.state.commentToCommentId
                    +" content: "+this.state.comment);
            }
            else{
                Alert.alert("comment to hean "+hean.hId+" content: "+this.state.comment);
            }
        }
    }

    commentHean(){
        this.setState({
            commentObject: 0
        });
        this.refs.input.focus();
    }

    commentToComment(commentId){
        this.setState({
            commentObject: 1,
            commentToCommentId:commentId
        });
        this.refs.input.focus();
    }

    render() {
        //const hean = this.props.navigation.getParam("hean", {});
        return (
            <KeyboardAvoidingView>
                <ScrollView style={css.view}>
                    <View style={css.Icon}>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{ uri: hean.avatar }}
                        />
                        <View style={css.username}>
                            <Text >{hean.username}</Text>
                            <Text>{hean.createdTime}</Text>
                        </View>
                    </View>
                    <Text style={css.font}>{hean.text}</Text>
                    <ImageGroup length={hean.pics.length} images={hean.pics} />
                    <View style={css.IconGroup}>
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.changeLike}>
                                <AntDesign
                                    name={"like2"}
                                    size={20}
                                    color={this.state.hasLiked ?"red":"black"}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.likeCount}</Text>
                        </View>
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.changeStar}>
                                <Feather
                                    name={"star"}
                                    size={20}
                                    color={this.state.hasStarred ?"red":"black"}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.starCount}</Text>
                        </View>
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.commentHean}>
                                <FontAwesome
                                    name={"comment-o"}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.commentCount}</Text>
                        </View>
                    </View>
                    {
                        hean.comments.map((item, index) => (
                            <TouchableOpacity onPress={()=>this.commentToComment(item.commentId)}>
                                <Comment comment={item}/>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={css.bottomBlank}/>
                </ScrollView>
                <View style={css.commentBox}>
                    <TextInput
                        ref="input"
                        placeholder={'说说你的想法'}
                        onChangeText={this.changeText}
                        />
                    <TouchableOpacity onPress={this.submitComment} style={css.sendIcon}>
                        <FontAwesome
                            name={"send"}
                            color={this.state.comment===""?"grey":"blue"}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
export default HeanDetailScreen;
const css = StyleSheet.create({
    bottomBlank:{
      height:40,
      backgroundColor: "#ffffff",
    },
    username:{
        marginLeft: 10,
        flexDirection:"column"
    },
    font:{
        lineHeight:20
    },
    IconGroup:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:5,
        marginTop:5
    },
    view:{
        paddingLeft:10,
        paddingRight:10
    },
    Icon:{
        flexDirection:"row",
        alignItems:"center"
    },
    commentBox: {
        position: 'absolute',
        height:40,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:"#ffffff",
        flexDirection:"row",
        alignItems:"center",
    },
    sendIcon:{
        position:'absolute',
        right:20
    }
});
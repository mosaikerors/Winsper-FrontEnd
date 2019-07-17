import React, { Component } from 'react';
import Comment from '../../../components/myinfo/Comment'
import {Avatar} from 'react-native-elements';
import {ScrollView, View, Text, TextInput, Alert, Button} from 'react-native';
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
            comment:""
        };
        this.changeText=this.changeText.bind(this);
        this.submitComment=this.submitComment.bind(this);
    };
    
    changeText(comment){
        this.setState({
            comment
        })
    }
    
    submitComment(){
        Alert.alert("submit: "+this.state.comment);
    }
    
    
    render() {
        //const hean = this.props.navigation.getParam("hean", {});
        return (
            <ScrollView style={{paddingLeft:10, paddingRight:10,}}>
                <View style={{flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        rounded
                        size={"medium"}
                        source={{ uri: hean.avatar }}
                    />
                    <View style={{ marginLeft: 10,flexDirection:"column"}}>
                        <Text >{hean.username}</Text>
                        <Text>{hean.createdTime}</Text>
                    </View>
                </View>
                <Text style={{lineHeight:20}}>{hean.text}</Text>
                <ImageGroup length={hean.pics.length} images={hean.pics} />
                <View style={{flexDirection:"row", justifyContent:"space-around",marginBottom:5, marginTop:5}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign
                            name={"like2"}
                            size={20}
                            color={hean.hasLiked ?"red":"black"}
                        />
                        <Text>{hean.likeCount}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Feather
                            name={"star"}
                            size={20}
                            color={hean.hasStarred ?"red":"black"}
                        />
                        <Text>{hean.starCount}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <FontAwesome
                            name={"comment-o"}
                            size={20}
                        />
                        <Text>{hean.commentCount}</Text>
                    </View>
                </View>
                <TextInput placeholder={"说说你的看法"} onChangeText={this.changeText}/>
                <Button onPress={this.submitComment} title={"评论"}/>
                {
                    hean.comments.map((item, index) => (
                        <Comment comment={item}/>
                    ))
                }
            </ScrollView>
        );
    }
}
export default HeanDetailScreen;
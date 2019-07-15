import React, { Component } from 'react';
import Comment from '../../../components/hean/Comment'
import { Avatar, Input} from 'react-native-elements';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import ImageGroup from '../../../components/hean/ImageGroup';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from "react-native-vector-icons/FontAwesome";
const { width } = Dimensions.get("window");

class HeanDetailScreen extends Component {
    static navigationOptions = {
        title: "函"
    };
    constructor(props) {
        super(props);
        const hean = this.props.navigation.getParam("hean", {});
        this.state = {
            username: "简媜",
            time: hean.createdTime,
            content: hean.text,
            images: hean.pics,
            comments: [
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "Two roads diverged in a yellow wood,\n" +
                        "And sorry I could not travel both\n" +
                        "And be one traveler, long I stood\n" +
                        "And looked down one as far as I could\n" +
                        "To where it bent in the undergrowth;\n" +
                        "Then took the other, as just as fair,\n" +
                        "And having perhaps the better claim,\n" +
                        "Because it was grassy and wanted wear;\n" +
                        "Though as for that the passing there\n" +
                        "Had worn them really about the same,\n" +
                        "And both that morning equally lay\n" +
                        "In leaves no step had trodden black.\n" +
                        "Oh, I kept the first for another day!\n" +
                        "Yet knowing how way leads on to way,\n" +
                        "I doubted if I should ever come back.\n" +
                        "I shall be telling this with a sigh\n" +
                        "Somewhere ages and ages hence:​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "窗景如画，人如画！每一帧都能作桌面的，除却琅琊榜，最爱阿令～图片截不到正面视角，应该会更有意境……（为了让自己缓缓，要对糖视而不见[允悲]） ​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "窗景如画，人如画！每一帧都能作桌面的，除却琅琊榜，最爱阿令～图片截不到正面视角，应该会更有意境……（为了让自己缓缓，要对糖视而不见[允悲]） ​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "窗景如画，人如画！每一帧都能作桌面的，除却琅琊榜，最爱阿令～图片截不到正面视角，应该会更有意境……（为了让自己缓缓，要对糖视而不见[允悲]） ​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                }
            ]
        };
    }

    render() {
        const hean = this.props.navigation.getParam("hean", {});
        return (
            <ScrollView>
                <View style={{ margin: width / 18}}>
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: width / 18 }}>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{ uri: "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0" }}
                        />
                        <View>
                            <Text style={{ marginLeft: 10, }}>{this.state.username}</Text>
                            <Text>{this.state.time}</Text>
                        </View>
                    </View>
                    <Text>{this.state.content}</Text>
                    <ImageGroup length={hean.pics.length} images={hean.pics} />
                    <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <AntDesign
                                name={"like2"}
                                size={20}
                                color={"red"}
                            />
                            <Text>{10000}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <MaterialIcons
                                name={"favorite"}
                                size={20}
                                color={"red"}
                            />
                            <Text>{10000}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <FontAwesome
                                name={"comment-o"}
                                size={20}
                            />
                            <Text>{10000}</Text>
                        </View>
                    </View>
                    
                    <Input placeholder={"抢个沙发吧"} />
                    {
                        this.state.comments.map((item, index) => (
                            <Comment time={item.time} avatar={item.avatar} username={item.username} content={item.content} />
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}
export default HeanDetailScreen;
import React, { Component } from 'react';
import Comment from '../../../components/common/Comment'
import { Avatar, Text } from 'react-native-elements';
import { Dimensions, View, ScrollView } from 'react-native';
import PhotoGroup from '../../../components/common/ImageGroup';
const { width } = Dimensions.get("window");
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from "react-native-vector-icons/Fontisto";
import { Input } from 'react-native-elements';

class HeanDetailScreen extends Component {
    //title = this.props.navigation.getParam("index", 0);
    static navigationOptions = {
        title: "函"
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "简媜",
            time: "今天 12:23",
            content: "约在医院门口见面，并且好好地晚餐。你的衣角仍飘荡着辛涩的药味，这应是最无菌的一次约会。可惜的，惨淡夜色让你看起来苍白，仿佛生与死的演绎仍鞭笞着你瘦而长的身躯。最高的纪录是，一个星期见十三名儿童死去，你常说你已学会在面对病人死亡之时，让脑子一片空白，继续做一个饱餐、更浴、睡眠的无所谓的人。在早期，你所写的那首《白鹭鸶》诗里，曾雄壮地要求天地给你这一袭白衣；白衣红里，你在数年之后《关渡手稿》这样写：恐怕，我是你的尸体衣裳，非婚礼华服，并且悄悄地后记着：“每次当病人危急时，我们明知无用，仍勉强做些急救的工作。其目的并非要救病人，而是来安慰家属。”",
            images: [
                "https://images.pexels.com/photos/1343465/pexels-photo-1343465.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0",
                "https://04imgmini.eastday.com/mobile/20190704/20190704163428_479ba6554be5639c7db51838bb57ad45_1.jpeg",
                "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0",
            ],
            comments: [
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "窗景如画，人如画！每一帧都能作桌面的，除却琅琊榜，最爱阿令～图片截不到正面视角，应该会更有意境……（为了让自己缓缓，要对糖视而不见[允悲]） ​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "《陈情令》能播出，我们已经很欣慰了！",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "陈情令无羁有点好听啊，单曲循环走起[憧憬]愿我的少年都能坦坦荡荡 无羁于心[爱你] ",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "今天 11:57",
                    "content": "我不管我先表白！！！这是中国公主神仙姐姐！！！[泪][泪][泪]",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "hao a hao a",
                    "content": "窗景如画，人如画！每一帧都能作桌面的，除却琅琊榜，最爱阿令～图片截不到正面视角，应该会更有意境……（为了让自己缓缓，要对糖视而不见[允悲]） ​",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "hao a hao a",
                    "content": "《陈情令》能播出，我们已经很欣慰了！",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "hao a hao a",
                    "content": "陈情令无羁有点好听啊，单曲循环走起[憧憬]愿我的少年都能坦坦荡荡 无羁于心[爱你] ",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                },
                {
                    "username": "lalala",
                    "time": "hao a hao a",
                    "content": "我不管我先表白！！！这是中国公主神仙姐姐！！！[泪][泪][泪]",
                    "avatar": "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0"
                }
            ]
        }
    }
    render() {
        return (
            <ScrollView style={{ marginLeft: width / 18, marginRight: width / 18, backgroundColor: "#" }}>
                <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        squared
                        size={"medium"}
                        source={{ uri: "http://puui.qpic.cn/vcover_vt_pic/0/vbb35hm6m6da1wc1561952321/0" }}
                    />
                    <View>
                        <Text style={{ marginLeft: 10, }}>{this.state.username}</Text>
                        <Text>{this.state.time}</Text>
                    </View>
                </View>
                <Text>{this.state.content}</Text>
                <PhotoGroup count={this.state.images.length} images={this.state.images} />
                <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <AntDesign
                            name={"like2"} size={24} />
                        <Text>{100}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <MaterialIcons
                            name={"favorite-border"} size={24} />
                        <Text>{100}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Fontisto
                            name={"like2"} size={24} />
                        <Text>{100}</Text>
                    </View>
                </View>
                <Input placeholder={"抢个沙发吧"} />
                {
                    this.state.comments.map((item, index) => (
                        <Comment time={item.time} avatar={item.avatar} username={item.username} content={item.content} />
                    ))
                }
            </ScrollView>
        );
    }
}
export default HeanDetailScreen;
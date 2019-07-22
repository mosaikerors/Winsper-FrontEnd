import React from "react";
import renderer from "react-test-renderer";
import HeanDetailScreen from "../../../../src/pages/myinfo/Repository/HeanDetailScreen";
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure,mount} from 'enzyme'

configure({adapter: new Adapter()});

const avatar = "../../../assets/images/p1.jpg";
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
            "commentId": 111,
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
            "commentId": 112,
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
            "commentId": 113,
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
            "commentId": 114,
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
            "commentId": 115,
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

test('renders HeanDetailScreen correctly', () => {
    const tree = renderer.create(
        <HeanDetailScreen hean={hean}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('test function changeLike',()=>{
    let wrapper = shallow(<HeanDetailScreen hean={hean} />);
    wrapper.find('TouchableOpacity').first().prop('onPress')();
    expect(wrapper.state().likeCount).toBe(99);
    expect(wrapper.state().hasLiked).toBe(false);
    wrapper.find('TouchableOpacity').first().prop('onPress')();
    expect(wrapper.state().likeCount).toBe(100);
    expect(wrapper.state().hasLiked).toBe(true);
});

test('test function changeStar',()=>{
    let wrapper = shallow(<HeanDetailScreen hean={hean} />);
    wrapper.find('TouchableOpacity').at(1).prop('onPress')();
    expect(wrapper.state().starCount).toBe(101);
    expect(wrapper.state().hasStarred).toBe(true);
    wrapper.find('TouchableOpacity').at(1).prop('onPress')();
    expect(wrapper.state().starCount).toBe(100);
    expect(wrapper.state().hasStarred).toBe(false);
});

test('test function changeText',()=>{
    let wrapper = shallow(<HeanDetailScreen hean={hean} />);
    let comment = "I have something to say";
    wrapper.find('TextInput').prop('onChangeText')(comment);
    expect(wrapper.state().comment).toBe(comment);
});

test('test function commentHean',()=>{
    let wrapper = mount(<HeanDetailScreen hean={hean} />);
    wrapper.find('TouchableOpacity').at(2).prop('onPress')();
    expect(wrapper.state().commentObject).toBe(0);
});

test('test function commentToComment',()=> {
    let wrapper = mount(<HeanDetailScreen hean={hean}/>);
    wrapper.find('TouchableOpacity').at(3).prop('onPress')();
    expect(wrapper.state().commentObject).toBe(1);
    expect(wrapper.state().commentToCommentId).toBe(111);
});

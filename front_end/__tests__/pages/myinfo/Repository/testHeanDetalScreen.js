import renderer from "react-test-renderer";
import React from "react";
import HeanDetailScreen from "../../../../src/pages/myinfo/Repository/HeanDetailScreen";

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

test('render hean detail', () => {
    const tree = renderer.create(
        <HeanDetailScreen hean={hean} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

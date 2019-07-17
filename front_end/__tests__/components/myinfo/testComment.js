import React from 'react';
import renderer from 'react-test-renderer';
import Comment from '../../../src/components/myinfo/Comment'


const avatar = '../../assets/images/p1.jpg';
const comment1 = {
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
};
const comment2 = {
    "commentId": "111",
    "commenter": {
        "uId":1,
        "username":"username1",
        "avatar":avatar
    },
    "commented": null,
    "time": 20191214,
    "content": "原谅我把冷寂的清官朝服剪成合身的寻日布衣，把你的一品丝绣" +
        "裁成放心事的暗袋，你娴熟的三行连韵与商簌体，到我手上变为缝缝补补的百衲图。" +
        "安静些，三月的鬼雨，我要翻箱倒箧，再裂一条无汗则拭泪的巾帕。"
};


test('render comment with commented ', () => {
    const tree = renderer.create(
        <Comment comment={comment1}  />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render comment without commented', () => {
    const tree = renderer.create(
        <Comment comment={comment2}  />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
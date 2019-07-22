import React from 'react';
import renderer from 'react-test-renderer';
import HeanCard from '../../../src/components/hean/HeanCard'

const hean1 =  {
    "hId": "1",
    "cover": "../assets/images/p1.jpg",
    "text": "mount 方法则会将 React 组件渲染为真实的 DOM 节点，特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。",
    "hasLiked": true,
    "hasStarred": false,
    "likeCount": 1000,
    "starCount": 999,
    "commentCount": 111,
};

const hean2 =  {
    "hId": "1",
    "cover": "../assets/images/p1.jpg",
    "text": "mount 方法则会将 React 组件渲染为真实的 DOM 节点，特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。",
    "hasLiked": false,
    "hasStarred": false,
    "likeCount": 1000,
    "starCount": 999,
    "commentCount": 111,
};

const hean3 =  {
    "hId": "1",
    "cover": "../assets/images/p1.jpg",
    "text": "mount 方法则会将 React 组件渲染为真实的 DOM 节点，特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。",
    "hasLiked": false,
    "hasStarred": true,
    "likeCount": 1000,
    "starCount": 999,
    "commentCount": 111,
};

const hean4 =  {
    "hId": "1",
    "cover": "https://tse4-mm.cn.bing.net/th?id=OIP.ImYDTf5CrXft11OUpTMSTQHaEA&w=215&h=160&c=7&o=5&dpr=1.5&pid=1.7",
    "text": "mount 方法则会将 React 组件渲染为真实的 DOM 节点，特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。",
    "hasLiked": true,
    "hasStarred": false,
    "likeCount": 1000,
    "starCount": 999,
    "commentCount": 111,
};

test('render hean1', () => {
    const tree = renderer.create(
        <HeanCard hean={hean1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render hean2', () => {
    const tree = renderer.create(
        <HeanCard hean={hean2} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render hean3', () => {
    const tree = renderer.create(
        <HeanCard hean={hean3} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render hean4', () => {
    const tree = renderer.create(
        <HeanCard hean={hean4} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
import React from 'react';
import renderer from 'react-test-renderer';
import ImageGroup from '../../../src/components/hean/ImageGroup'

const images1 = [
    "../assents/images/p1.jpg"
];
const images2 = [
    "../assents/images/p1.jpg",
    "../assents/images/p2.jpg"
];
const images3 = [
    "../assents/images/p1.jpg",
    "../assents/images/p2.jpg",
    "../assents/images/p3.jpg"
];
const images4 = [
    "../assents/images/p1.jpg",
    "../assents/images/p2.jpg",
    "../assents/images/p3.jpg",
    "../assents/images/p4.jpg",
];

test('render ImageGroup1', () => {
    const tree = renderer.create(
        <ImageGroup images={images1} length={images1.length} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
test('render ImageGroup2', () => {
    const tree = renderer.create(
        <ImageGroup images={images2} length={images2.length} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render ImageGroup3', () => {
    const tree = renderer.create(
        <ImageGroup images={images3} length={images3.length} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('render ImageGroup4', () => {
    const tree = renderer.create(
        <ImageGroup images={images4} length={images4.length} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

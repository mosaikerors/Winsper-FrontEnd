import React from 'react';
import renderer from 'react-test-renderer';
import DetailedBlock from '../../../src/components/myinfo/DetailedBlock';
import {configure, shallow, mount} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
configure({adapter: new Adapter()});

test("renders detailed block correctly", ()=>{
    const tree = renderer.create(
        <DetailedBlock />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

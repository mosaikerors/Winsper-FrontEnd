import React from 'react';
import renderer from 'react-test-renderer';
import BottomBanner from "../../../src/components/myinfo/BottomBanner";

test("renders bottom banner", ()=>{
    const tree = renderer.create(
        <BottomBanner />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
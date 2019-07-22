import React from 'react';
import renderer from 'react-test-renderer';
import BottomBanner from "../../../src/components/myinfo/BottomBanner";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()});

test("renders bottom banner", ()=>{
    const tree = renderer.create(
        <BottomBanner />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

// test("test function navigate to Settings", ()=>{
//     const wrapper = mount(
//         <BottomBanner />
//     );
//     wrapper.find("TouchableOpacity").first().prop("onPress")();
//     console.log(wrapper.state());
// });

test("renders bottom banner", ()=>{
    const tree = renderer.create(
        <BottomBanner />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
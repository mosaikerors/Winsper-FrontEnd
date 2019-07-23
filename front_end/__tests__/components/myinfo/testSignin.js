import React from 'react';
import renderer from 'react-test-renderer';
import {Signin} from '../../../src/components/myinfo/Signin';
import {configure, mount} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
configure({adapter: new Adapter()});

test("renders sign in correctly", ()=>{
    const tree = renderer.create(
            <Signin />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('test function update phone state',()=> {
    const text="123456";
    let wrapper = mount(
            <Signin />);
    wrapper.find('Input').at(0).prop('onChangeText')(text);
    expect(wrapper.state().phone).toBe(text);
});

test('test function update password state',()=> {
    const text="123456";
    let wrapper = mount(
            <Signin />);
    wrapper.find('Input').at(1).prop('onChangeText')(text);
    expect(wrapper.state().password).toBe(text);
});

test('test function sign in successfully',()=> {
    const text="123456";
    let wrapper = mount(
        <Signin />);
    wrapper.find('Button').prop('onPress')();
    console.log(wrapper.state());
    expect(wrapper.state().password).toBe(text);
});

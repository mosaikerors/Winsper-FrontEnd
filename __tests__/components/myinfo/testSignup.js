import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../../../src/components/myinfo/Signup';
import {configure, mount} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import {store} from '../../../src/store/index'
configure({adapter: new Adapter()});

test("renders sign up correctly", ()=>{
    const tree = renderer.create(
        <Provider store={store}>
            <Signup />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("test function change input state", ()=> {
    const phone="13813141036";
    const code="000000";
    const text="cznczn";
    const wrapper = mount(
        <Signup/>
    );
    wrapper.find("Input").at(0).prop("onChangeText")(phone);
    expect(wrapper.state().phone).toBe(phone);
    wrapper.find("Button").at(0).prop("onPress")();
    expect(wrapper.state().rescodeForSendCode).toBe(-1);
    wrapper.find("Input").at(1).prop("onChangeText")(code);
    expect(wrapper.state().code).toBe(code);
    wrapper.find("Input").at(2).prop("onChangeText")(text);
    expect(wrapper.state().username).toBe(text);
    wrapper.find("Input").at(3).prop("onChangeText")(text);
    expect(wrapper.state().password).toBe(text);
    wrapper.find("Button").at(1).prop("onPress")();
    expect(wrapper.state().rescodeForSignup).toBe(-1);
});

test("test function submit successfully", ()=> {
    const phone="13813141036";
    const code="000000";
    const text="cznczn";
    const wrapper = mount(
        <Signup/>
    );
    wrapper.find("Input").at(0).prop("onChangeText")(phone);
    expect(wrapper.state().phone).toBe(phone);
    wrapper.find("Input").at(1).prop("onChangeText")(code);
    expect(wrapper.state().code).toBe(code);
    wrapper.find("Input").at(2).prop("onChangeText")(text);
    expect(wrapper.state().username).toBe(text);
    wrapper.find("Input").at(3).prop("onChangeText")(text);
    expect(wrapper.state().password).toBe(text);
});
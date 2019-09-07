import React from 'react';
import renderer from 'react-test-renderer';
import DetailedBlock from '../../../src/components/myinfo/DetailedBlock';
import {configure ,mount} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
configure({adapter: new Adapter()});

test("renders detailed block correctly", ()=>{
    const tree = renderer.create(
        <DetailedBlock />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("test navigate to Message", ()=>{
    const navigation = { navigate: jest.fn() };
    let wrapper = mount(
        <DetailedBlock navigation={navigation}/>
    );
    wrapper.find("TouchableOpacity").at(0).prop("onPress")();
    wrapper.find("TouchableOpacity").at(1).prop("onPress")();
    wrapper.find("TouchableOpacity").at(2).prop("onPress")();
    wrapper.find("TouchableOpacity").at(3).prop("onPress")();
    wrapper.find("TouchableOpacity").at(4).prop("onPress")();
    wrapper.find("TouchableOpacity").at(5).prop("onPress")();
    wrapper.find("TouchableOpacity").at(6).prop("onPress")();
    wrapper.find("TouchableOpacity").at(7).prop("onPress")();
});
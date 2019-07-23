import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../../../src/components/myinfo/Signup';
import {configure} from "enzyme/build";
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

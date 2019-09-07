import React from 'react';
import renderer from 'react-test-renderer';
import {configure} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import {store} from '../../../src/store/index'
import TopBanner from "../../../src/components/myinfo/TopBanner";
configure({adapter: new Adapter()});

test("renders top banner correctly", ()=>{
    const tree = renderer.create(
        <Provider store={store}>
            <TopBanner />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

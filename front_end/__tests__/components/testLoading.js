import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../src/components/Loading';

test("renders sign in correctly", ()=>{
    const tree = renderer.create(
            <Loading />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
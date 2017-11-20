import HeaderWithButton from './HeaderWithButton';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly when the title is a string', () => {
    const tree = renderer.create(
        <HeaderWithButton onClick={() => { }} buttonLabel="Test Label" title="Test Title" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


it('renders correctly when the title is an array', () => {
    const tree = renderer.create(
        <HeaderWithButton onClick={() => {}} buttonLabel="Test Label" title={['Test Title', 'Title Element 2']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
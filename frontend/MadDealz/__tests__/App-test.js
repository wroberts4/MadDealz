/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Barpage from '../src/pages/barpage';
import Contact from '../src/pages/contact';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Tests barpage snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Barpage />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests contact snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Contact />).toJSON();
    expect(tree).toMatchSnapshot();
});
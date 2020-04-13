/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Barpage from '../src/pages/barpage';
import Contact from '../src/pages/contact';
import Favorites from '../src/pages/favorites';
import Profile from '../src/pages/profile';
import Home from '../src/pages/home';
import Login from '../src/pages/login';
import Signup from '../src/pages/signup';


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

// Tests favorite snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Favorites />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests profile snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests home page snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests login snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests signup snapshot
test('renders correctly', () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
});
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Barpage from '../src/pages/barpage';
import ChangeEmail from '../src/pages/changeEmail'
import ChangeImage from '../src/pages/changeImage';
import ChangePassword from '../src/pages/ChangePassword';
import Contact from '../src/pages/contact';
import Favorites from '../src/pages/favorites';
import ForgotPassword from '../src/pages/forgotPassword';
import Profile from '../src/pages/profile';
import Home from '../src/pages/home';
import Login from '../src/pages/login';
import NewPassword from '../src/pages/newPassword';
import Signup from '../src/pages/signup';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock(
    '../node_modules/react-native/Libraries/LayoutAnimation/LayoutAnimation.js',
  );
/*
// Tests barpage snapshot
test('Test bar page', () => {
    const tree = renderer.create(<Barpage />).toJSON();
    expect(tree).toMatchSnapshot();
});
*/
// Tests change email snapshot
test('Test change email page', () => {
    const tree = renderer.create(<ChangeEmail />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests change image snapshot
test('Test change image page', () => {
    const tree = renderer.create(<ChangeImage />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests change password snapshot
test('Test change password page', () => {
    const tree = renderer.create(<ChangePassword />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests contact snapshot
test('Test contact page', () => {
    const tree = renderer.create(<Contact />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests favorite snapshot
test('Test favorites page', () => {
    const tree = renderer.create(<Favorites />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests forgot password snapshot
test('Test forgot password page', () => {
    const tree = renderer.create(<ForgotPassword />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests home page snapshot
test('Test home page', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests login snapshot
test('Test login page', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests new password snapshot
test('Test new password page', () => {
    const tree = renderer.create(<NewPassword />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests profile snapshot
test('Test profile page', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
});

// Tests signup snapshot
test('Test signup page', () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
});

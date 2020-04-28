/**
 * @format
 */

import 'react-native';
import React from 'react';
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
jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props: any) => {
      return <View>{props.children}</View>;
    };
    const MockMarker = (props: any) => {
      return <View>{props.children}</View>;
    };
    return {
      __esModule: true,
      default: MockMapView,
      Marker: MockMarker,
    };
  });

// Tests barpage snapshot
test('Test bar page', () => {
    const tree = renderer.create(<Barpage bar={{"_id": "5e9501a3ce88ec2b4aad2cea", "address": "1330 Regent St #1255, Madison, WI 53715", 
    "contact": "(608) 251-6375", 
    "deals": [{"_id": "5ea8585cdcfc50383c9591f4", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$2 Domestic Taps", "times": {"Friday": {"end": "6:00PM", "start": "3:00PM"}, "Monday": {"end": "6:00PM", "start": "3:00PM"}, "Thursday": {"end": "6:00PM", "start": "3:00PM"}, "Tuesday": {"end": "6:00PM", "start": "3:00PM"}, "Wednesday": {"end": "6:00PM", "start": "3:00PM"}}}, 
    {"_id": "5ea85866dcfc50383c9591f5", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Select Micro Taps", "times": {"Friday": {"end": "6:00PM", "start": "3:00PM"}, "Monday": {"end": "6:00PM", "start": "3:00PM"}, "Thursday": {"end": "6:00PM", "start": "3:00PM"}, "Tuesday": {"end": "6:00PM", "start": "3:00PM"}, "Wednesday": {"end": "6:00PM", "start": "3:00PM"}}}, 
    {"_id": "5ea85870dcfc50383c9591f6", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$1 Off Bottled Beers", "times": {"Friday": {"end": "6:00PM", "start": "3:00PM"}, "Monday": {"end": "6:00PM", "start": "3:00PM"}, "Thursday": {"end": "6:00PM", "start": "3:00PM"}, "Tuesday": {"end": "6:00PM", "start": "3:00PM"}, "Wednesday": {"end": "6:00PM", "start": "3:00PM"}}}, 
    {"_id": "5ea8587fdcfc50383c9591f7", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$.50 off Wine and Mixed Drinks", "times": {"Friday": {"end": "6:00PM", "start": "3:00PM"}, "Monday": {"end": "6:00PM", "start": "3:00PM"}, "Thursday": {"end": "6:00PM", "start": "3:00PM"}, "Tuesday": {"end": "6:00PM", "start": "3:00PM"}, "Wednesday": {"end": "6:00PM", "start": "3:00PM"}}}, 
    {"_id": "5ea85889dcfc50383c9591f8", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "Discounts on Pitchers", "times": {"Friday": {"end": "6:00PM", "start": "3:00PM"}, "Monday": {"end": "6:00PM", "start": "3:00PM"}, "Thursday": {"end": "6:00PM", "start": "3:00PM"}, "Tuesday": {"end": "6:00PM", "start": "3:00PM"}, "Wednesday": {"end": "6:00PM", "start": "3:00PM"}}}, 
    {"_id": "5ea85950dcfc50383c9591f9", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$1.50 Rail Mixers", "times": {"Monday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea8595ddcfc50383c9591fa", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Select Micro", "times": {"Monday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea85969dcfc50383c9591fb", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Smirnoff Mixers", "times": {"Tuesday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea85975dcfc50383c9591fc", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Captain Mixers", "times": {"Wednesday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea8597adcfc50383c9591fd", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Spotted Cow Taps", "times": {"Wednesday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea85984dcfc50383c9591fe", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Swamp Waters", "times": {"Thursday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea8598cdcfc50383c9591ff", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$1.50 Domestic Taps", "times": {"Thursday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea85995dcfc50383c959200", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3 Lagunitas IPA", "times": {"Thursday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea8599cdcfc50383c959201", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$2 Domestic Taps", "times": {"Friday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea859a6dcfc50383c959202", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3.50 Deep Eddy Vodka Mixers", "times": {"Friday": {"end": "2:00AM", "start": "8:00PM"}}}, 
    {"_id": "5ea859c7dcfc50383c959203", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$8 Mega Bloody's", "times": {"Saturday": {"end": "2:00PM", "start": "11:00AM"}}}, 
    {"_id": "5ea859cedcfc50383c959204", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3.50 Mimosas", "times": {"Saturday": {"end": "2:00PM", "start": "11:00AM"}}}, 
    {"_id": "5ea859d7dcfc50383c959205", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$3.50 Mimosas", "times": {"Sunday": {"end": "2:00PM", "start": "11:00AM"}}}, 
    {"_id": "5ea859e0dcfc50383c959206", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$8 Mega Bloody's", "times": {"Sunday": {"end": "2:00PM", "start": "11:00AM"}}}, 
    {"_id": "5ea85a28dcfc50383c959207", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$7 Buckets of Domestic Shorties", "times": {"Saturday": {"end": "2:00AM", "start": "11:00AM"}}}, 
    {"_id": "5ea85a3bdcfc50383c959208", "bar_id": "5e9501a3ce88ec2b4aad2cea", "info": "$7 Domestic Pitchers", "times": {"Sunday": {"end": "2:00AM", "start": "11:00AM"}}}], 
    "distance": 6484.263322508761, "favorites": 0, "hours": {"Friday": {"close": "2:00AM", "open": "11:00AM"}, "Monday": {"close": "2:00AM", "open": "11:00AM"}, "Saturday": {"close": "2:00AM", "open": "11:00AM"}, "Sunday": {"close": "11:30PM", "open": "11:00AM"}, "Thursday": {"close": "2:00AM", "open": "11:00AM"}, "Tuesday": {"close": "2:00AM", "open": "11:00AM"}, "Wednesday": {"close": "2:00AM", "open": "11:00AM"}}, 
    "image": "5e9501a3ce88ec2b4aad2cea.png", "info": [], "location": {"lat": 43.06787, "lon": -89.408264}, "name": "Jordan's Big Ten Pub", "rating": null, "reviews": []}}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

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

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from 'react-native';

import {goToTabs, goToSignup, goToForgotPwd} from '../../navigation';

import {getItem} from '../../getItem';

import AsyncStorage from '@react-native-community/async-storage';

let user_requests = require('../requests/user_requests');

export default class Login extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  forgotPwdPage = async () => {
    goToForgotPwd();
  };

  signupPage = async () => {
    goToSignup();
  };

  tabsPage = async () => {
    try {
      await AsyncStorage.setItem('Hello World');
    } catch (error) {
      // Error saving data
    }
    goToTabs();
  };

  componentDidMount = async () => {
    let dataToken = await AsyncStorage.getItem('@user');
    console.log(dataToken);
    if (dataToken !== null) {
      //const {navigate} = this.props.navigation;

      goToTabs();
    }
  };

  userLogin = async () => {
    try {
      let user = await user_requests.user_login("test@gmail.com", "password", 5000);
      console.log(user);
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      this.tabsPage();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={require('../../assets/logo.png')} style={styles.image} />

        <Text style={styles.greeting}>{'Login'}</Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.userLogin}>
          <Text style={{fontWeight: '500', color: '#222'}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 32,
          }}
          onPress={this.forgotPwdPage}>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#f55'}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 8,
          }}
          onPress={this.signupPage}>
          <Text style={{color: '#777', fontSize: 13}}>
            Don't have an account?{' '}
            <Text style={{fontWeight: '500', color: '#f55'}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  greeting: {
    marginTop: 28,
    color: '#ccc',
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    marginTop: 28,
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#ccc',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#eee',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#f55',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 400,
    height: 128,
    marginTop: 64,
  },
});

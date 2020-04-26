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
import styles from './styles';

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
      if (this.state.email && this.state.password) {
        let user = await user_requests.user_login(this.state.email, this.state.password, 5000);
        console.log(user);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        this.tabsPage();
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.containerLogin}>
        <StatusBar barStyle="light-content" />
        <Image source={require('../../assets/logo.png')} style={styles.imageLogin} />

        <Text style={styles.greetingLogin}>{'Login'}</Text>

        <View style={styles.formLogin}>
          <View>
            <Text style={styles.inputTitleLogin}>Email Address</Text>
            <TextInput
              style={styles.inputLogin}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={ (email) => this.setState({ email }) }
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitleLogin}>Password</Text>
            <TextInput
              style={styles.inputLogin}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={ (password) => this.setState({ password }) }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.buttonLogin} onPress={this.userLogin}>
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
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {goToTabs, goToLogin} from '../../navigation';

import AsyncStorage from '@react-native-community/async-storage';

let user_requests = require('../requests/user_requests');

export default class Signup extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  state = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  loginPage = async () => {
    goToLogin();
  };

  tabsPage = async () => {
    goToTabs();
  };

  signupPress = async () => {
    if (this.state.username && this.state.email && this.state.password) {
      let user = await user_requests.add_user(this.state.username, this.state.password, this.state.email, 5000);
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      goToTabs();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}></Image>

        <Text style={styles.greeting}>{'Sign Up'}</Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              style={styles.input}
              returnKeyType="next"
              onChangeText={ (username) => this.setState({ username })} 
              testID='Username'>
            </TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              testID="Email"
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={ (email) => this.setState({ email }) }>
              </TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              testID="Password"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={ (password) => this.setState({ password }) }>
              </TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.signupPress} testID="SignUp">
          <Text style={{fontWeight: '500', color: '#222'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 32,
          }}
          testID='Login'
          onPress={this.loginPage}>
          <Text style={{color: '#777', fontSize: 13}}>
            Already have an account?{' '}
            <Text style={{fontWeight: '500', color: '#f55'}}>Login</Text>
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
    fontWeight: '700',
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

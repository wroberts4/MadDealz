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

import {goToLogin, goToNewPwd} from '../../navigation';

export default class ForgotPassword extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  loginPage = async () => {
    goToLogin();
  };

  newPasswordPage = async () => {
    goToNewPwd();
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}></Image>

        <Text style={styles.greeting}>{'Reset Password'}</Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              testID='Email'
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="done"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.newPasswordPage} testID='ResetPassword'>
          <Text style={{fontWeight: '500', color: '#222'}}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 32,
          }}
          testID='Login'
          onPress={this.loginPage}>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#f55'}}>
            Back to Login
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

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
    email: '',
    password: '',
  };

  loginPage = async () => {
    goToLogin();
  };

  tabsPage = async () => {
    goToTabs();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}></Image>

        <Text style={styles.greeting}>
          {'Welcome to MadDealz!\nSign Up to get started.'}
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput style={styles.input} autoCapitalize="none"></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput style={styles.input} autoCapitalize="none"></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.tabsPage}>
          <Text style={{fontWeight: '500', color: '#222'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 32,
            marginBottom: 100,
          }}
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
    marginTop: -32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
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
    flex: 1,
    width: null,
    height: null,
  },
});

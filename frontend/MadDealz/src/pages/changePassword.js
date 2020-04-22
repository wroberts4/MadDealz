import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {goToTabs} from '../../navigation';

let user_requests = require('../requests/user_requests');

export default class ChangePassword extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  tabsPage = async () => {
    goToTabs();
  };

  componentDidMount = async () => {
    let dataToken = await AsyncStorage.getItem('@user');
    console.log(dataToken);
  };

  changePassword = async () => {
    try {
      if (
        this.state.newPassword2 &&
        this.state.newPassword &&
        this.state.email &&
        this.state.password
      ) {
        if (this.state.newPassword == this.state.newPassword2) {
          let user = await user_requests.user_login(
            this.state.email,
            this.state.password,
            5000,
          );
          console.log(user);
          await AsyncStorage.setItem('@user', JSON.stringify(user));
          user.password = this.state.newPassword;
          console.log(user);
          let newusername = await user_requests.update_user(user, 5000);
          console.log(user.password);
          this.tabsPage();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.greeting}>{'Change Password'}</Text>

        <View style={styles.form}>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Old Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={password => this.setState({password})}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={newPassword => this.setState({newPassword})}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Repeat New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={newPassword2 => this.setState({newPassword2})}
            />
          </View>
   
        </View>

        <TouchableOpacity style={styles.button} onPress={this.changePassword}>
          <Text style={{fontWeight: '500', color: '#222'}}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.tabsPage}>
          <Text style={{fontWeight: '500', color: '#222'}}>Return</Text>
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
    borderRadius: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    alignSelf: 'center',
    width: 400,
    height: 128,
    marginTop: 64,
  },
});

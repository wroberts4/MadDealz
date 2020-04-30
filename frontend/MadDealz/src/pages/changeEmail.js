import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
} from 'react-native';

import {goToTabs} from '../../navigation';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'

let user_requests = require('../requests/user_requests');

export default class ChangeEmail extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  tabsPage = async () => {
    goToTabs('ProfileScreen');
  };

  componentDidMount = async () => {
    let dataToken = await AsyncStorage.getItem('@user');
    //console.log(dataToken);
  };

  changeName = async () => {
    try {
      if (this.state.newEmail && this.state.email && this.state.password) {
        let user = await user_requests.user_login(
          this.state.email,
          this.state.password,
          5000,
        );
        //console.log(user);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        user.email = this.state.newEmail;
        //console.log(user);
        let newusername = await user_requests.update_user(user, 5000);
        this.tabsPage();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.containerChangeEmail}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.greeting}>{'Change Email'}</Text>

        <View style={styles.form}>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>New Email Address</Text>
            <TextInput
              testID='New'
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={newEmail => this.setState({newEmail})}
            />

            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              testID='Old'
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={email => this.setState({email})}
            />

            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              testID='Password'
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={password => this.setState({password})}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.buttonChangeEmail} onPress={this.changeName} testID='Change'>
          <Text style={{fontWeight: '500', color: '#222'}}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonChangeEmail} onPress={this.tabsPage} testID='Return'>
          <Text style={{fontWeight: '500', color: '#222'}}>Return</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
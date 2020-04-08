import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {goToLogin, goToChangePwd} from '../../navigation';

export default class Profile extends Component {
  loginPage = async () => {
    goToLogin();
  };

  changePwdPage = async () => {
    goToChangePwd();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.loginPage}>
          <Text style={{fontWeight: '500', color: '#222'}}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.changePwdPage}>
          <Text style={{fontWeight: '500', color: '#222'}}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#f55',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

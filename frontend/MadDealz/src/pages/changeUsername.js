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

import {goToTabs} from '../../navigation';

export default class ChangeUsername extends Component {
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

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Text style={styles.greeting}>{'Change Username'}</Text>

        <View style={styles.form}>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>New Username</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"></TextInput>
          </View>

          <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />


          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.tabsPage}>
          <Text style={{fontWeight: '500', color: '#222'}}>
            Change Username
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
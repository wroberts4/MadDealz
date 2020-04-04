import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {goToLogin, goToTabs} from '../../navigation';

export default class Loading extends React.Component {
  async componentDidMount() {
    const username = null; //await AsyncStorage.getItem('username');

    if (username) {
      goToTabs(global.icons, username);
    } else {
      goToLogin();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#000',
  },
});

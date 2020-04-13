import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, Image, Button, Icon, Header, Avatar} from 'react-native-elements';

import {goToLogin, goToChangePwd, goToChangeUsername, goToChangeImage} from '../../navigation';

import AsyncStorage from '@react-native-community/async-storage';

let userId = "";

export default class Profile extends Component {
  loginPage = async () => {
    try {
      await AsyncStorage.removeItem('@user');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    goToLogin();
  };

  changeUsernamePage = async () => {
    goToChangeUsername();
  };

  changeImagePage = async () => {
    goToChangeImage();
  };

  changePwdPage = async () => {
    goToChangePwd();
  };

  _retrieveData = async () => {
    try {
      user = await AsyncStorage.getItem('@user');
      console.log("This is the user: " + JSON.parse(user).username);
      if (user !== null) {
        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount = async () => {
    this._retrieveData();
  };

  render() {
    let userImage = '../../assets/Husky.jpg';

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{backgroundColor: '#990000'}}
          centerComponent={{text: userId, style: { color: '#ccc',
          fontSize: 30,
          fontWeight: 'bold', } }}
        />
        <ScrollView style={styles.scroll}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 5,
            }}>
            <Avatar
              rounded
              size={200}
              source={require(userImage)}
              resizeMode="contain"
            />
            <Text style={{color: 'white'}}>{userId}</Text>
          </View>
         
          <TouchableOpacity style={styles.button} onPress={this.changeImagePage}>
            <Text style={styles.inputTitle}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.changeUsernamePage}>
            <Text style={styles.inputTitle}>
              Change Username
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.changePwdPage}>
            <Text style={styles.inputTitle}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.loginPage}>
            <Text style={styles.inputTitle}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
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
  form: {
    marginTop: 28,
    marginBottom: 48,
    marginHorizontal: 30,
    height: 200,
    width: Dimensions.get('screen').width - 40,
  },
  inputTitle: {
    color: '#ccc',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: '#ccc',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#eee',
  },
  bottomButton: {
    marginHorizontal: 30, borderRadius: 4, alignItems: 'center',
    justifyContent: 'center',
    height: 32, fontWeight: '500', color: '#222'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#990000',
    borderRadius: 10,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
});

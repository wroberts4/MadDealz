import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { v4 as uuidv4 } from 'uuid';

import {goToTabs} from '../../navigation';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class ChangeImage extends Component {
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

  openImagePicker = async () => {
    let image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    });
    let user = JSON.parse(await AsyncStorage.getItem('@user'));
    let uuid = uuidv4().replace('-', '_');
    user.image = uuid;
    console.log('uwu: ' + JSON.stringify(user));
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    await user_requests.upload_image(user.username, image, uuid, 5000);
  }

  render() {

    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.greeting} testID='Text'>{'Change Profile Picture'}</Text>

        <TouchableOpacity style={styles.button} onPress={this.openImagePicker} testID='Change'>
          <Text style={{fontWeight: '500', color: '#222'}}>Change Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.tabsPage} testID='Return'>
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
    marginTop: 50,
    marginBottom: 15,
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
    marginBottom: 20
  },
  image: {
    alignSelf: 'center',
    width: 400,
    height: 128,
    marginTop: 64,
  },
});

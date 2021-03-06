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

import {goToLogin, goToChangePwd, goToChangeEmail, goToChangeImage} from '../../navigation';

import AsyncStorage from '@react-native-community/async-storage';
import ImageLoad from 'react-native-image-placeholder';
import sty from './styles';

let userId = "";
let ip = "https://api.maddealz.software/images/user/";

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
  }

  loginPage = async () => {
    try {
      await AsyncStorage.removeItem('@user');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    goToLogin();
  };

  changeEmailPage = async () => {
    goToChangeEmail();
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
      //console.log("This is the user: " + JSON.parse(user));
      if (user !== null) {
        this.setState({user: JSON.parse(user)});
        this.setState({image_uri: ip + this.state.user.image + '.png'})
        console.log("User found: " + this.state.user.username)
        console.log('image link: ' + this.state.image_uri);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount = async () => {
    this._retrieveData();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={sty.header_2}
          centerComponent={{text: this.state.user.username, style: { 
            color: '#ccc',
            fontSize: 30,
            fontWeight: 'bold', 
            marginBottom: 15,} 
          }}
        />
        <ScrollView style={styles.scroll}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 5,
              borderRadius: 75,
            }}>
            <ImageLoad
                style={{ borderRadius: 75, width: 150, height: 150, marginBottom: 15, marginTop: 10 }}
                source={{
                  uri: this.state.image_uri,
                  // method: 'POST',
                  cache: 'default'
                }}
                resizeMode={'cover'}
                borderRadius={75}
                loadingStyle={{ size: 'large', color: 'gray' }}
                placeholderSource={require('../../assets/blank-profile.png')}
                placeholderStyle={{borderRadius: 75, width: 150, height: 150}}
            />
          </View>
         
          <TouchableOpacity style={styles.button} onPress={this.changeImagePage} testID='Picture'>
            <Text style={styles.inputTitle}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.changeEmailPage}
            testID='Email'>
            <Text style={styles.inputTitle}>
              Change Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.changePwdPage} testID='Password'>
            <Text style={styles.inputTitle}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.loginPage} testID='Logout'>
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
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 20,
    width: 250
  },
  header: {
    height: 73,
    backgroundColor: '#990000',
    overflow: 'hidden',
    shadowColor: 'black',
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 10
  }
  
});

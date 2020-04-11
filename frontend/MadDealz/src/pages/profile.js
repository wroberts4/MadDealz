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

import {goToLogin, goToChangePwd, goToChangeUsername} from '../../navigation';

export default class Profile extends Component {
  loginPage = async () => {
    goToLogin();
  };

  changeUsernamePage = async () => {
    goToChangeUsername();
  };

  changePwdPage = async () => {
    goToChangePwd();
  };

  render() {
    const {userId} = this.props;

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{backgroundColor: '#990000'}}
          leftComponent={
            <Button
              icon={<Icon name="arrow-back" />}
              onPress={this.tabsPage}
              buttonStyle={{backgroundColor: '#990000'}}
            />
          }
          centerComponent={{text: userId}}
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
              source={require('../../assets/Husky.jpg')}
              resizeMode="contain"
              showEditButton
            />
            <Text style={{color: 'white'}}>{userId}</Text>
          </View>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>

            <View style={{marginTop: 32}}>
              <Text style={styles.inputTitle}>Old Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
              />
            </View>

            <View style={{marginTop: 32}}>
              <Text style={styles.inputTitle}>New Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.loginPage}>
            <Text style={{fontWeight: '500', color: '#222'}}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.changePwdPage}>
            <Text style={{fontWeight: '500', color: '#222'}}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.changeUsernamePage}>
            <Text style={{fontWeight: '500', color: '#222'}}>
              Change Username
            </Text>
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
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

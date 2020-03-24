/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
import Barpage from './barpage'; // Barpage screen
import Home from  './home'; // Home screen
import Profile from './profile'; // Profile screen

AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
Navigation.registerComponent('BarpageScreen', () => Barpage);
Navigation.registerComponent('HomeScreen', () => Home);
Navigation.registerComponent('ProfileScreen', () => Profile);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            component: {
              //name: "navigation.playground.WelcomeScreen"
              name: "HomeScreen",
              options: {
                bottomTab: {
                  text: 'Home'
                }
              }
            }
          },
          {
            component: {
              name: "ProfileScreen",
              options: {
                bottomTab: {
                  text: 'Profile'
                }
              }
            }
          }

        ]
        
      }
    }
  });
});
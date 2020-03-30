/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';

import Barpage from './src/screens/barpage'; // Barpage screen
import Home from './src/screens/home'; // Home screen
import Profile from './src/screens/profile'; // Profile screen
import Favorites from './src/screens/favorites'; // Favorites page

import Login from './src/screens/login'; // Login screen
import Signup from './src/screens/signup'; // Signup screen

AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
Navigation.registerComponent('BarpageScreen', () => Barpage);
Navigation.registerComponent('HomeScreen', () => Home);
Navigation.registerComponent('ProfileScreen', () => Profile);
Navigation.registerComponent('FavoritesScreen', () => Favorites);
Navigation.registerComponent('LoginScreen', () => Login);
Navigation.registerComponent('SignupScreen', () => Signup);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        component: {
                            //name: "navigation.playground.WelcomeScreen"
                            name: 'HomeScreen',
                            options: {
                                bottomTab: {
                                    text: 'Home',
                                },
                            },
                        },
                    },
                    {
                        component: {
                            name: 'ProfileScreen',
                            options: {
                                bottomTab: {
                                    text: 'Profile',
                                },
                            },
                        },
                    },
                    {
                        component: {
                            name: 'FavoritesScreen',
                            options: {
                                bottomTab: {
                                    text: 'Favorites',
                                },
                            },
                        },
                    },
                    {
                        component: {
                            // TEMPORARY FOR TESTING, does not belong on bottom tab
                            name: 'BarpageScreen',
                            options: {
                                bottomTab: {
                                    text: 'BarPage',
                                },
                            },
                        },
                    },
                    // {
                    //     component: {
                    //         // TEMPORARY FOR TESTING, does not belong on bottom tab
                    //         name: 'LoginScreen',
                    //         options: {
                    //             bottomTab: {
                    //                 text: 'Login',
                    //             },
                    //         },
                    //     },
                    // },
                    {
                        component: {
                            // TEMPORARY FOR TESTING, does not belong on bottom tab
                            name: 'SignupScreen',
                            options: {
                                bottomTab: {
                                    text: 'Signup',
                                },
                            },
                        },
                    },
                ],
            },
        },
    });
});

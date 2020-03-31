/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/pages/App';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import Barpage from './src/pages/barpage'; // Barpage screen
import Home from './src/pages/home'; // Home screen
import Profile from './src/pages/profile'; // Profile screen
import Favorites from './src/pages/favorites'; // Favorites page
import Login from './src/pages/login'; // Login screen
import Signup from './src/pages/signup'; // Signup screen

AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => gestureHandlerRootHOC(App));
Navigation.registerComponent('BarpageScreen', () => gestureHandlerRootHOC(Barpage));
Navigation.registerComponent('HomeScreen', () => gestureHandlerRootHOC(Home));
Navigation.registerComponent('ProfileScreen', () => gestureHandlerRootHOC(Profile));
Navigation.registerComponent('FavoritesScreen', () => gestureHandlerRootHOC(Favorites));
Navigation.registerComponent('LoginScreen', () => gestureHandlerRootHOC(Login));
Navigation.registerComponent('SignupScreen', () => gestureHandlerRootHOC(Signup));

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

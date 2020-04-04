/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/pages/App';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import Loading from './src/pages/loading'; // Loading screen

AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () =>
    gestureHandlerRootHOC(App),
);
Navigation.registerComponent('LoadingScreen', () =>
    gestureHandlerRootHOC(Loading),
);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'LoadingScreen',
            },
        },
    });
});

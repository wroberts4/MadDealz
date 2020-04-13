import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import Barpage from './src/pages/barpage'; // Barpage screen
import Home from './src/pages/home'; // Home screen
import Profile from './src/pages/profile'; // Profile screen
import Favorites from './src/pages/favorites'; // Favorites page
import Login from './src/pages/login'; // Login screen
import Signup from './src/pages/signup'; // Signup screen
import ForgotPwd from './src/pages/forgotPassword'; // Forgot Password Screen
import NewPwd from './src/pages/newPassword'; // New Password Screen
import ChangePwd from './src/pages/changePassword'; // Change Password Screen
import ChangeUsername from './src/pages/changeUsername'; // Change Username Screen
import ChangeImage from './src/pages/changeImage'; // Change Avatar Screen
import Contact from './src/pages/contact'; // Contact Screen

Navigation.registerComponent('BarpageScreen', () =>
  gestureHandlerRootHOC(Barpage),
);
Navigation.registerComponent('HomeScreen', () => gestureHandlerRootHOC(Home));
Navigation.registerComponent('ProfileScreen', () =>
  gestureHandlerRootHOC(Profile),
);
Navigation.registerComponent('FavoritesScreen', () =>
  gestureHandlerRootHOC(Favorites),
);
Navigation.registerComponent('LoginScreen', () => gestureHandlerRootHOC(Login));
Navigation.registerComponent('SignupScreen', () =>
  gestureHandlerRootHOC(Signup),
);
Navigation.registerComponent('ForgotPwdScreen', () =>
  gestureHandlerRootHOC(ForgotPwd),
);
Navigation.registerComponent('NewPwdScreen', () =>
  gestureHandlerRootHOC(NewPwd),
);
Navigation.registerComponent('ChangePwdScreen', () =>
  gestureHandlerRootHOC(ChangePwd),
);
Navigation.registerComponent('ChangeUsernameScreen', () =>
  gestureHandlerRootHOC(ChangeUsername),
);
Navigation.registerComponent('ContactScreen', () => 
  gestureHandlerRootHOC(Contact),
);
Navigation.registerComponent('ChangeImageScreen', () =>
  gestureHandlerRootHOC(ChangeImage),
);
export const goToLogin = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'LoginScreen',
            },
          },
        ],
      },
    },
  });

export const goToSignup = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'SignupScreen',
            },
          },
        ],
      },
    },
  });

export const goToForgotPwd = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'ForgotPwdScreen',
            },
          },
        ],
      },
    },
  });

export const goToNewPwd = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'NewPwdScreen',
            },
          },
        ],
      },
    },
  });


export const goToBarPage = (barId) =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'BarpageScreen',
              options: {
                topBar: {
                  visible: false
                }
              },
              passProps: {
                barId
              }
            },
          },
        ],
      },
    },
  });

export const goToChangePwd = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'ChangePwdScreen',
            },
          },
        ],
      },
    },
  });

  export const goToChangeUsername = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'ChangeUsernameScreen',
            },
          },
        ],
      },
    },
  });

  export const goToChangeImage = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stackMain',
        children: [
          {
            component: {
              name: 'ChangeImageScreen',
            },
          },
        ],
      },
    },
  });

export const goToTabs = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            component: {
              name: 'HomeScreen',
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: require('./assets/home.png')
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
                  icon: require('./assets/account.png')
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
                  icon: require('./assets/favorite.png'),
                },
              },
            },
          },
          {
            component: {
              name: 'ContactScreen',
              options: {
                bottomTab: {
                  text: 'Contact',
                  icon: require('./assets/mail.png'),
                },
              },
            },
          },
        ],
      },
    },
  });

import * as firebase from 'firebase';

  // Change this to your firebase configuration! (Add Firebase to your web app)
const FIREBASE_CONFIG = {
  'apiKey'           : 'AIzaSyCmiC51QTYRejlodY3sRfYe16F11mQFFj4',
  'authDomain'       : 'pta-investment-management.firebaseapp.com',
  'databaseURL'      : 'https://pta-investment-management.firebaseio.com',
  'projectId'        : 'pta-investment-management',
  'storageBucket'    : 'pta-investment-management.appspot.com',
  'messagingSenderId': '616356780838'
};

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export default firebaseApp;

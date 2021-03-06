import * as firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../conf/firebase_Config';

const FireBaseTools = {
  /*
   * Return an instance of a firebase auth provider based on the provider string.
   *
   * @param provider
   * @returns {firebase.auth.AuthProvider}
   */
  getProvider: (provider) => {
    // TODO プロバイダ毎での認証を行えるようにswitchで実装
    switch (provider) {
      case 'email':
        return new firebase.auth.EmailAuthProvider();
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
      case 'github':
        return new firebase.auth.GithubAuthProvider();
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider();
      case 'google':
        return new firebase.auth.GoogleAuthProvider();
      default:
        throw new Error('Provider is not supported!!!');
    }
  },

  /*
   * Login with provider => p is provider "email", "facebook", "github", "google", or "twitter"
   * Uses Popup therefore provider must be an OAuth provider. EmailAuthProvider will throw an error
   *
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginWithProvider: (p) => {
    const provider = FireBaseTools.getProvider(p);
    return firebaseAuth.signInWithPopup(provider).then(firebaseAuth.user).catch(error => ({
      errorCode   : error.code,
      errormessage: error.message,
    }));
  },

  /*
   * Register a user with email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  registerUser: user => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userInfo => userInfo)
      .catch(error => ({
        errorCode   : error.code,
        errormessage: error.message,
      })),

  /*
   * Sign the user out
   *
   * @returns {
   *    !firebase.Promise.<*>|
   *    firebase.Thenable<any>|
   *    firebase.Promise<any>|
   *    !firebase.Thenable.<*>
   *  }
   */
  logoutUser: () => firebaseAuth.signOut().then(() => ({
    success: 1,
    message: 'logout',
  })),

  /*
   * Retrieve the current user (Promise)
   * @returns {Promise}
   */
  fetchUser: () => new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  }),

  /*
   * Log the user in using email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginUser: user => firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(userInfo => userInfo)
      .catch(error => ({
        errorCode   : error.code,
        errormessage: error.message,
      })),

  /*
   * Update a user's profile data
   *
   * @param u
   * @returns {
   *    !firebase.Promise.<*>|
   *    firebase.Thenable<any>|
   *    firebase.Promise<any>|
   *    !firebase.Thenable.<*>
   *  }
   */
  updateUserProfile: u =>
    firebaseAuth.user.updateProfile(u).then(() =>
      firebaseAuth.user, error => ({
        errorCode   : error.code,
        errormessage: error.message,
      })),

  /*
   * Reset the password given the specified email
   *
   * @param email {string}
   * @returns {
   *    !firebase.Promise.<*>|
   *    firebase.Thenable<any>|
   *    firebase.Promise<any>|
   *    !firebase.Thenable.<*>
   *  }
   */
  resetPasswordEmail: email => firebaseAuth.sendPasswordResetEmail(email).then(() => ({
    message: 'Email sent',
  }), error => ({
    errorCode   : error.code,
    errormessage: error.message,
  })),

  /*
   * Update the user's password with the given password
   *
   * @param newPassword {string}
   * @returns {
   *    !firebase.Promise.<*>|
   *    firebase.Thenable<any>|
   *    firebase.Promise<any>|
   *    !firebase.Thenable.<*>
   *  }
   */
  changePassword: newPassword => firebaseAuth.user.updatePassword(newPassword).then(user =>
      user, error => ({
        errorCode   : error.code,
        errormessage: error.message,
      })),

  /*
   * Send an account email verification message for the currently logged in user
   *
   * @returns {
   *    !firebase.Promise.<*>|
   *    firebase.Thenable<any>|
   *    firebase.Promise<any>|
   *    !firebase.Thenable.<*>
   *  }
   */
  sendEmailVerification: () =>
    firebaseAuth.user.sendEmailVerification().then(() => ({
      message: 'Email sent',
    }), error => ({
      errorCode   : error.code,
      errormessage: error.message,
    })),

  /*
   * Get the firebase database reference.
   *
   * @param path {!string|string}
   * @returns {!firebase.database.Reference|firebase.database.Reference}
   */
  getDatabaseReference: path => firebaseDb.ref(path),
};

export default FireBaseTools;

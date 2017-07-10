import firebase from '../../conf/firebase_Config';
import {
  LOGIN_CHECK,
  SIGNUP,
  LOGIN,
  LOGOUT,
  FIREBASE_PASSWORD_RESET_EMAIL,
} from '../../actions/types';
import {  browserHistory  } from 'react-router';

const auth = firebase.auth();

// getter setter
export const authProps = [
  {
    name  : 'uid',
    getter: function() {
      return this.state.uid;
    },
    setter: function(val) {
      this.state.uid = val;
    }
  },
  {
    name  : 'isLogin',
    getter: function() {
      return this.state.isLogin;
    },
    setter: function(val) {
      this.state.isLogin = val;
    }
  }
];

const loginCheck = {
  type  : LOGIN_CHECK,
  action: function loginCheck() {
    // start loading...
    this.setState({
      isDataFetch: true,
    });
    const result = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogin       : true,
          uid           : user.uid,
          displayName   : user.name,
          email         : user.email,
          isDataFetch   : false,
          loadedUserPost: false,
        });
      } else {
        this.setState({
          isLogin    : false,
          uid        : null,
          isDataFetch: false,
        });
      }
    });
  }
};

const signup = {
  type  : SIGNUP,
  action: function signup(data) {
    const result = auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        // if (e.payload.errorCode) {
        //   this.setState({
        //     message: data.payload.errorMessage
        //   });
        // } else {
        browserHistory.push('/profile');
        // }
      }
    );
  }
};

const login = {
  type  : LOGIN,
  action: function login(data) {
    const result = auth.signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        // if (e.payload.errorCode) {
        //   this.setState({
        //     message: data.payload.errorMessage
        //   });
        // } else {
        browserHistory.push('/profile');
        // }
        this.emit(SIGNUP);
      }
    );
  }
};

const logout = {
  type  : LOGOUT,
  action: function logout() {
    const result = auth.signOut().then(() => {
      browserHistory.push('/');
    });
  }
};

const renewPassword = {
  type  : FIREBASE_PASSWORD_RESET_EMAIL,
  action: function renewPassword(email) {
    const result = auth.sendPasswordResetEmail(email).then(() => {
      // browserHistory.push('/reset');
      this.setState({ message: 'ご指定のメールアドレスにパスワードリセットの情報を送信しました!' });
    });
  },
};

export default {
  loginCheck,
  login,
  signup,
  logout,
  renewPassword,
};

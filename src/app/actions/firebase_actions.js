// import { firebaseDb } from '../conf/firebase_Config';
import FireBaseTools from '../utils/firebase';
import * as type from './types';

// const ref = firebaseDb.ref('users');
//
// // Firebaseへのアクセス
// export function loginWithProvider(provider) {
//   const request = FireBaseTools.loginWithProvider(provider);
//   return {
//     type   : LOGIN_WITH_PROVIDER_FIREBASE,
//     payload: request,
//   };
// }
//
// // 会員登録
// export function registerUser(user) {
//   const request = FireBaseTools.registerUser(user);
//   return {
//     type   : REGISTER_FIREBASE_USER,
//     payload: request,
//   };
// }
//
// // ログイン
// export function loginUser(user) {
//   const request = FireBaseTools.loginUser(user);
//   return {
//     type   : LOGIN_FIREBASE_USER,
//     payload: request,
//   };
// }
//
// // 現在の会員情報取得
// export function fetchUser() {
//   const request = FireBaseTools.fetchUser();
//   return {
//     type   : FETCH_FIREBASE_USER,
//     payload: request,
//   };
// }

// 会員情報変更
export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type   : type.UPDATE_FIREBASE_USER,
    payload: request,
  };
}

// パスワード変更
export function changePassword(password) {
  const request = FireBaseTools.changePassword(password);
  return {
    type   : type.CHANGE_FIREBASE_USER_PASSWORD,
    payload: request,
  };
}
//
// // パスワードリセット
// export function resetPasswordEmail(email) {
//   const request = FireBaseTools.resetPasswordEmail(email);
//   return {
//     type   : FIREBASE_PASSWORD_RESET_EMAIL,
//     payload: request,
//   };
// }
//
// // ログアウト
// export function logoutUser(user) {
//   const request = FireBaseTools.logoutUser(user);
//   return {
//     type   : LOGOUT_FIREBASE_USER,
//     payload: request,
//   };
// }

export default class Actions {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  // --------------------------------------
  // auth
  // --------------------------------------
  loginCheck() {
    this.dispatcher.emit(type.LOGIN_CHECK);
  }

  signup(email, password) {
    const data = {  email, password  };
    this.dispatcher.emit(type.SIGNUP, data);
  }

  login(email, password) {
    const data = {  email, password  };
    this.dispatcher.emit(type.LOGIN, data);
  }

  logout() {
    this.dispatcher.emit(type.LOGOUT);
  }

  renewPassword(email) {
    this.dispatcher.emit(type.FIREBASE_PASSWORD_RESET_EMAIL, email);
  }

  // --------------------------------------
  // post
  // --------------------------------------
  newPost(uid, post) {
    const data = post;
    data.uid = uid;
    this.dispatcher.emit(type.NEW_POST, data);
  }

  updatePost(uid, key, slug, post) {
    post.uid = uid;
    post.key = key;
    post.slug = slug;
    this.dispatcher.emit(type.UPDATE_POST, post);
  }

  removePost(post) {
    this.dispatcher.emit(type.REMOVE_POST, post);
  }

  changeDetailType(showType) {
    this.dispatcher.emit(type.CHANGE_DETAIL_TYPE, showType);
  }

  getUserPosts() {
    this.dispatcher.emit(type.GET_USER_POSTS);
  }

  showDetail(slug, showType) {
    const data = { slug, showType };
    this.dispatcher.emit(type.SHOW_DETAIL, data);
  }
}

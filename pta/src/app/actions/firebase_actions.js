import FireBaseTools, { firebaseDb } from '../utils/firebase';
import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER,
  USERS_RECEIVE_DATA,
  USERS_RECIVE_ERROR,
  ADD_TASK_ERROR,
  UPDATE_TASK_ERROR,
  DELETE_TASK_ERROR,
} from './types';

const ref = firebaseDb.ref('users');

// Firebaseへのアクセス
export function loginWithProvider(provider) {
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type   : LOGIN_WITH_PROVIDER_FIREBASE,
    payload: request,
  };
}

// 会員登録
export function registerUser(user) {
  const request = FireBaseTools.registerUser(user);
  return {
    type   : REGISTER_FIREBASE_USER,
    payload: request,
  };
}

// ログイン
export function loginUser(user) {
  const request = FireBaseTools.loginUser(user);
  return {
    type   : LOGIN_FIREBASE_USER,
    payload: request,
  };
}

// 現在の会員情報取得
export function fetchUser() {
  const request = FireBaseTools.fetchUser();
  return {
    type   : FETCH_FIREBASE_USER,
    payload: request,
  };
}

// 会員情報変更
export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type   : UPDATE_FIREBASE_USER,
    payload: request,
  };
}

// パスワード変更
export function changePassword(password) {
  const request = FireBaseTools.changePassword(password);
  return {
    type   : CHANGE_FIREBASE_USER_PASSWORD,
    payload: request,
  };
}

// パスワードリセット
export function resetPasswordEmail(email) {
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type   : FIREBASE_PASSWORD_RESET_EMAIL,
    payload: request,
  };
}

// ログアウト
export function logoutUser(user) {
  const request = FireBaseTools.logoutUser(user);
  return {
    type   : LOGOUT_FIREBASE_USER,
    payload: request,
  };
}

// Subscribe
export function loadFireBaseDbUsers() {
  return dispatch => {
    ref.off();
    // valueを購読する。todosに変更があれば、以下の処理が実行される。
    ref.on(
      'value',
      (snapshot) => {
        dispatch(loadFireBaseDbUsersSuccess(snapshot));
      },
      (error) => {
        dispatch(loadFireBaseDbUsersError(error));
      },
    );
  };
}

// firebase Db の userドキュメント参照時の成功
export function loadFireBaseDbUsersSuccess(snapshot) {
  return {
    type: USERS_RECEIVE_DATA,
    data: snapshot.val(),
  };
}

// firebase Db の userドキュメント参照時の失敗
export function loadFireBaseDbUsersError(error) {
  return {
    type   : USERS_RECIVE_ERROR,
    message: error.message,
  };
}

// firebase Db の userドキュメントの追加登録
export function addFireBaseDbUser(users) {
  return dispatch => {
    ref.push({
      users    : users,
      completed: false,
    })
    .catch(error => dispatch({
      type   : ADD_TASK_ERROR,
      message: error.message,
    }));
  };
}

// firebase Db の userドキュメントの更新
export function updateFireBaseDbUser(uid) {
  return (dispatch, getState) => {
    const state = getState();
    const user = state.users.filter(user => user.uid === uid);
    // パスのオブジェクトをアップデートします。
    // updateにはオブジェクトを渡すと差分を自動で更新してくれます。
    firebaseDb.ref(`users/${uid}`).update({completed: !user[0].completed})
    .catch(error => dispatch({
      type   : UPDATE_TASK_ERROR,
      message: error.message,
    }));
  };
}

// firebase Db の userドキュメントの削除
export function deleteFireBaseDbUser(uid) {
  return dispatch => {
    // パスのオブジェクトを削除します。
    firebaseDb.ref(`users/${uid}`).remove()
    .catch(error => dispatch({
      type   : DELETE_TASK_ERROR,
      message: error.message,
    }));
  };
}

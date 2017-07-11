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
} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_FIREBASE_USER:
      return action.payload;
    case LOGOUT_FIREBASE_USER:
      return action.payload;
    case REGISTER_FIREBASE_USER:
      return action.payload;
    case LOGIN_FIREBASE_USER:
      return action.payload;
    case UPDATE_FIREBASE_USER:
      return action.payload;
    case CHANGE_FIREBASE_USER_PASSWORD:
      return action.payload;
    case FIREBASE_PASSWORD_RESET_EMAIL:
      return action.payload;
    case LOGIN_WITH_PROVIDER_FIREBASE:
      return action.payload;
    default:
      return state;
  }
}

function fireBaseDbUserInformation(state =[], action) {
  switch (action.type) {
    case USERS_RECEIVE_DATA: {
      const users = [];
      if (action.data) {
        Object.keys(action.data).forEach(key =>{
          const user = action.data[key];
          users.push({
            uid      : user.uid,
            name     : user.name,
            roles    : user.roles,
            grade    : user.grade,
            completed: user.completed,
          });
        });
      }
      return [...users];
    }
    case USERS_RECIVE_ERROR:
      return action.payload;
    case ADD_TASK_ERROR:
      return action.payload;
    case UPDATE_TASK_ERROR:
      return action.payload;
    case DELETE_TASK_ERROR:
      return action.payload;
      // alert(action.message);
      // break;
  }
}

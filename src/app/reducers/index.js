import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';

const rootReducer = combineReducers({
  user: FireBaseUserReducer
});

export default rootReducer;

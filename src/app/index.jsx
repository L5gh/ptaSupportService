import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import routes from './routes';

import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router
      history={browserHistory}
      routes={routes}
    />
  </Provider>
  , document.querySelector('.react-root'));

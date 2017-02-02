import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import RoutingProvider from 'dltfd-routing/components/Provider.js';
import syncStore from 'dltfd-routing/syncStore.js';

import reducers from './reducers/index.js';
import routes from './routes.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  composeEnhancers(
    applyMiddleware(
      ReduxThunk
    )
  )
);

syncStore(store);

const rootElement = document.querySelector('[data-page-root]');

ReactDOM.render(
  <Provider store={store}>
    <RoutingProvider routes={routes} />
  </Provider>
, rootElement);

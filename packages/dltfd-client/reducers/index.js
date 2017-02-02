import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page from './page.js';

const reducers = combineReducers({
  page: page,
  routing: routerReducer
});

export default reducers;

import { combineReducers } from 'redux';

import sessionReducer from './session';

import loadingReducer from './loading';

export default combineReducers({
  ui: combineReducers({
    loading: loadingReducer,
  }),
  core: combineReducers({
    session: sessionReducer,
  }),
});

import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  loadingBar
});

export default rootReducer;

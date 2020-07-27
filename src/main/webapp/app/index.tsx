import App from 'app/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import DevTools from './config/devtools';
import initStore from './config/store';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

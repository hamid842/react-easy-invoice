import React from 'react';
import ReactDom from 'react-dom';
import { store, StoreContext } from './mobx/stores/store';
import App from 'app/app';

ReactDom.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

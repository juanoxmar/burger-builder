import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import burgerBuildReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  burger: burgerBuildReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

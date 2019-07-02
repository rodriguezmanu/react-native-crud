import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const middlewareItems = [thunk];

if (__DEV__) {
  //  const _XHR = GLOBAL.originalXMLHttpRequest
  //     ? GLOBAL.originalXMLHttpRequest
  //     : GLOBAL.XMLHttpRequest;
  //   XMLHttpRequest = _XHR;

  middlewareItems.push(logger);
}

const middleware = applyMiddleware(...middlewareItems);

export default function configureStore(data = {}) {
  const store = createStore(reducers, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store };
}

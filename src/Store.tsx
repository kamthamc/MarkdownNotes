import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './Reducers';
import sagas from './Sagas';


export default function() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(sagas);

  return store;
}

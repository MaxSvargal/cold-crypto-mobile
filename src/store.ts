import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { Store } from 'redux'

import rootReducer from './reducers'
import mySaga from './sagas'

const createStoreNext = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

  sagaMiddleware.run(mySaga)

  return store
}

export default createStoreNext
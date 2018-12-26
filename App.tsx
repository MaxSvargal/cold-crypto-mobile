import React from 'react'
import { Provider } from 'react-redux'

import createStore from './src/store'
import App from './src/App'

const store = createStore()

export default () =>
  <Provider store={store}>
    <App/>
  </Provider>

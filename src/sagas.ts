import { all, fork } from 'redux-saga/effects'

import { sagas } from './webrtc'

export default function* rootSaga() {
  yield all([
    fork(sagas)
  ])
}

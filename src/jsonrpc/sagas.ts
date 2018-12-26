import { take, fork, put } from 'redux-saga/effects'
import { webRtcIsReady, sendRtcMessage, webRtcRecieveMsg } from '../webrtc/actions'
import { updateWalletList } from './actions'

function* watchForRtcMessagesSaga() {
  while (true) try {
    const { payload } = yield take(webRtcRecieveMsg) // TODO: Add typings
    console.log({payload})

    switch (payload.method) {
      case 'getWalletsList':
        yield put(updateWalletList(payload.props.wallettList))
        break
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield take(webRtcIsReady)

  yield fork(watchForRtcMessagesSaga)
  yield put(sendRtcMessage({ method: 'getWalletsList' }))
}

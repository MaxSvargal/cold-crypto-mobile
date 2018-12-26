import { take, fork, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { webRtcSendMsg, webRtcRecieveMsg } from '../actions'

function* watchForRtcMessage() {
  while (true) try {
    const { payload } = yield take(webRtcRecieveMsg)
    console.log({payload})

  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  try {
    console.log('saga started')
    yield fork(watchForRtcMessage)

    // Yes, we can push messages immideately without waiting for vebview will be ready
    yield put(webRtcSendMsg({ method: 'initiateConnect', props: [] }))

    yield delay(3000)
    yield put(webRtcSendMsg({ method: 'initiateConnect', props: [] }))

  } catch (err) {
    console.log(err)
  }
}

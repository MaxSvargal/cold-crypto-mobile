import { take, fork, put, call } from 'redux-saga/effects'
import { webRtcSendMsg, webRtcRecieveMsg, qrRequestReceived, webRtcIsReady } from '../actions'

function* sendRtcMessage(...props: any[]) {
  yield put(webRtcSendMsg({ method: 'send', props }))
}

function* initByRequest(request: string) {
  yield put(webRtcSendMsg({ method: 'initByRequest', props: [ request ] }))
}

function* watchForRtcConnectionSaga() {
  while (true) try {
    const { payload } = yield take(webRtcRecieveMsg) // TODO: Add typings
    console.log({payload})

    switch (payload.method) {
      case 'initByRequest':
        yield call(sendRtcMessage, { method: 'answer', props: { spd: payload.props.answer } })
        yield call(sendRtcMessage, { method: 'channelOpened' })
        break
      case 'channelOpened':
        yield put(webRtcIsReady(true))
        break
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  try {
    yield fork(watchForRtcConnectionSaga)

    const { payload: request } = yield take(qrRequestReceived) // Move this action to other duck
    yield call(initByRequest, request)

    yield take(webRtcIsReady)
    console.log('Wow! Datachannel connection is ready!')

  } catch (err) {
    console.log(err)
  }
}

import { take, fork, put, call } from 'redux-saga/effects'
import { webRtcSendMsg, webRtcRecieveMsg, qrRequestReceived, webRtcIsReady, sendRtcMessage } from '../actions'

function* sendRtcMessageSaga(...props: any[]) {
  yield put(webRtcSendMsg({ method: 'send', props }))
}

function* initByRequestSaga(request: string) {
  yield put(webRtcSendMsg({ method: 'initByRequest', props: [ request ] }))
}

function* watchForRtcConnectionSaga() {
  while (true) try {
    const { payload } = yield take(webRtcRecieveMsg) // TODO: Add typings
    console.log({payload})

    switch (payload.method) {
      case 'initByRequest':
        yield call(sendRtcMessageSaga, { method: 'answer', props: { spd: payload.props.answer } })
        yield call(sendRtcMessageSaga, { method: 'channelOpened' })
        break
      case 'channelOpened':
        yield put(webRtcIsReady(true))
        break
    }
  } catch (err) {
    console.log(err)
  }
}

function* watchForSendMessageRequestsSaga() {
  while (true) {
    const { payload } = yield take(sendRtcMessage)
    yield call(sendRtcMessageSaga, payload)
  }
}

export default function* rootSaga() {
  try {
    yield fork(watchForRtcConnectionSaga)

    const { payload: request } = yield take(qrRequestReceived) // Move this action to other duck
    yield call(initByRequestSaga, request)

    yield take(webRtcIsReady)
    console.log('Datachannel connection is ready')

    yield fork(watchForSendMessageRequestsSaga)
  } catch (err) {
    console.log(err)
  }
}

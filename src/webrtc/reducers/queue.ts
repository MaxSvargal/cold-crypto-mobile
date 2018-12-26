import { createReducer } from 'redux-act'

import { webRtcSendMsg, webRtcClearQueue } from '../actions'

export interface RtcRequest {
  method: string
  props: any[]
}

const defaultState = [] as RtcRequest[]
const reducer = createReducer<typeof defaultState>({}, defaultState)

reducer.on(webRtcSendMsg, (state, payload) => [ ...state, payload ])
reducer.on(webRtcClearQueue, () => [])

export default reducer
export type IState = typeof defaultState

import { combineReducers } from 'redux'

import webrtc, { IState as IStateWebRtc } from './webrtc/reducers'

export interface IState {
  webrtc: IStateWebRtc
}

export default combineReducers({
  webrtc
})

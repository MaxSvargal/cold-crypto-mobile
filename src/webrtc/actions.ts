import { createAction } from 'redux-act'

import { RtcRequest } from './reducers/queue'

export const webRtcRecieveMsg = createAction<(ev: { method?: string, props?: any[], response?: any, error?: Error }) => void>()
export const webRtcSendMsg = createAction<RtcRequest>()
export const webRtcClearQueue = createAction()
export const webRtcIsReady = createAction<boolean>()

// Public actions
export const sendRtcMessage = createAction<any>()

// TODO: Move to other duck (QR?)
export const qrRequestReceived = createAction<string>()

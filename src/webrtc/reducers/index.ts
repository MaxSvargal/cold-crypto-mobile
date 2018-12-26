import { combineReducers } from 'redux'

import queue, { IState as IRpcQueueState } from './queue'

export type IState = {
  queue: IRpcQueueState
}

export default combineReducers<IState>({
  queue
} as any) // TODO: wattf with TS?

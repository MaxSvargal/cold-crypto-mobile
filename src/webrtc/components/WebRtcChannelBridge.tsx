import React, { Component } from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { WebView, Text } from 'react-native'

import webViewScript from './WebRtcChannelWebView'
import { webRtcRecieveMsg, webRtcClearQueue } from '../actions'
import { IState } from '../../reducers'

interface StateProps {
  queue: IState['webrtc']['queue']
}

interface DispatchProps {
  webRtcRecieveMsg: typeof webRtcRecieveMsg
  webRtcClearQueue: typeof webRtcClearQueue
}

type Props = DispatchProps & StateProps

class WebRtcChannelBridge extends Component<Props> {
  webViewRef: WebView | null = null

  shouldComponentUpdate = ({ queue }: StateProps) => queue.length > 0
  componentDidUpdate = () => this.checkQueue()

  checkQueue = () => {
    console.log('checkQueue')
    const { queue, webRtcClearQueue } = this.props
    console.log('componentDidUpdate', queue)

    if (queue.length > 0) {
      queue.forEach(q =>
        this.webViewRef!.postMessage(JSON.stringify(q)))
      webRtcClearQueue()
    }
    return null
  }

  onMessage = (data: string) => {
    try {
      this.props.webRtcRecieveMsg(JSON.parse(data))
    } catch (error) {
      this.props.webRtcRecieveMsg({ error } as any)
    }
  }

  render() {
    console.log('rerender')
    return (
      <>
      <Text>This bridge {this.props.queue!.length}</Text>
      <WebView
        ref={(ref) => this.webViewRef = ref}
        // style={{ display: 'none' }}
        originWhitelist={['*']}
        onError={ (err) => console.log(`WEBVIEW error`, err) }
        onLoad={this.checkQueue}
        onLoadStart={ () => console.log(`WEBVIEW load start`) }
        onLoadEnd={ () => console.log(`WEBVIEW load end`) }
        javaScriptEnabled={true}
        source={{
          baseUrl: '',
          html: `<html><head><script>${webViewScript()}</script></head></html>`
        }}
        onNavigationStateChange={ (ev) => console.log(`WEBVIEW nav state change`, ev) }
        onMessage={ (ev) => this.onMessage(ev.nativeEvent.data) }
      />
      </>
    )
  }
}
// MapStateToProps<StateProps, {}, {}
const mapStateToProps: any = ({ webrtc: { queue} }: IState) => ({ queue })
const withConnect = connect<MapStateToProps<StateProps, {}, {}>, DispatchProps>(
  mapStateToProps,
  { webRtcClearQueue, webRtcRecieveMsg }
)
export default withConnect(WebRtcChannelBridge)

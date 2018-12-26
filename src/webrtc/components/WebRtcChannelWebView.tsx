import webRtcDataChannel from 'webrtc-datachannel'

declare const WebRtcDataChannel: typeof webRtcDataChannel
type WebRtcDataChannelMethod = (...xs: any[]) => Promise<any>

function main() {
  const rtc = new WebRtcDataChannel({
  	connection: {
  		iceServers: [
  			{ urls: [ 'stun:stun.l.google.com:19302' ] }
  		]
  	}
  })

  document.addEventListener('message', (event: any) => {
    try {
      const { method, props }: { method: string, props: any[] } = JSON.parse(event.data)

      if (!(method in rtc)) return
      let classMethod = (rtc as any)[method] as WebRtcDataChannelMethod

      classMethod.call(void 0, props).then(response =>
        window.postMessage(JSON.stringify({ method, props, response }), '*'))

    } catch (err) {
      window.postMessage(JSON.stringify({ err }), '*')
    }
  })
}

export default () =>
  `${require('../helpers/tsPolyfills').default}${webRtcDataChannel.toString()};${main.toString()};main();`

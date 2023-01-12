/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-11-14 17:21:04
 * @LastEditors: kdsec
 * @LastEditTime: 2022-05-24 09:53:18
 */

const YURI_MSG_SEND = 'YURI_MSG_SEND'
const YURI_MSG_RECEIVE = 'YURI_MSG_RECEIVE'

function initYuriMsg(mitt) {
  window.addEventListener('message', (e) => {
    const msg = e.data
    if (msg.type === YURI_MSG_RECEIVE) {
      const data = msg.data
      mitt.emit(data.type, data.data)
    }
  })
}

function sendYuriMsg(type, data) {
  window.postMessage(
    {
      type: YURI_MSG_SEND,
      data: {
        type: type,
        data: data
      }
    },
    '*'
  )
}

export { initYuriMsg, sendYuriMsg }

import {
  Contact,
  Message,
  ScanStatus,
  log,
} from 'wechaty'
import request from '../../http/request'

import { generate } from 'qrcode-terminal'

export function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    generate(qrcode, { small: true })

    const qrcodeImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

export function onLogin(user: Contact) {
  log.info('StarterBot', '%s login', user)
}

export function onLogout(user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

export async function onMessage(msg: Message) {
  if (msg.self()) return

  console.log('=============================')
  console.log(`msg : ${msg}`)
  console.log(
    `from: ${msg.from() ? msg?.from()?.name() : null}: ${
    msg.from() ? msg?.from()?.id : null
    }`
  )
  console.log(`to: ${msg.to()}`)
  console.log(`text: ${msg.text()}`)
  console.log(`isRoom: ${msg.room()}`)
  console.log('=============================')

  // 判断此消息类型是否为文本
  if (msg.type() === Message.Type.Text) {
    // 判断消息类型来自群聊
    if (msg.room()) {
      // 获取群聊
      const room: any = await msg.room()

     // 收到消息，提到自己
      if (await msg.mentionSelf()) {
       // 获取提到自己的名字
        let self: any = await msg.to()
        self = '@' + self?.name()
        // 获取消息内容，拿到整个消息文本，去掉 @+名字
        const sendText = msg.text().replace(self, '')
        const res = await requestRobot(sendText)
        room.say(res)
      }
    } else {
      const reply = await requestRobot(msg.text())
      msg.say(reply)
    }
  }
  function requestRobot(info): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = 'http://openapi.tuling123.com/openapi/api/v2'
      request.post(url, {
        reqType: 0,
        perception: {
          inputText: {
            text: info,
          },
        },
        userInfo: {
          apiKey: 'xxx',
          userId: 'xxx'
        }
      }).then((data: any) => {
        console.log(data)
        if (data.intent.code === 0 || data.intent.code === 10004) {
          resolve(data.results[0].values.text)
        }
      })
    })
  }
}
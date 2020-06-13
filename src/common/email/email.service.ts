
import { Inject } from '@nestjs/common'
import { ConfigService } from '../../modules/shared/service/config.service'
const nodemailer = require('nodemailer')

export class EmailService {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}
  async send(payload) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.exmail.qq.com',
      port: 465,
      secureConnection: true,
      auth: {
        user: 'admin@demo.com',
        pass: 'J53uCbzDrHmXv9Ws'
      },
      logger: false,
      debug: false,
    })
    const info = await transporter.sendMail({
      from: '测试 <admin@demo.com>',
      to: payload.email,
      subject: '完成注册 ✔',
      html: `测试`
    });

    console.log('Message sent: %s', info.messageId);
  }

}


import { Inject, Injectable } from '@nestjs/common';
import { Wechaty, log } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import { onScan, onLogin, onLogout, onMessage } from './robot.func';
import { ConfigService } from '../shared/service/config.service'
import config from './config'

@Injectable()
export class RobotService {
  private bot;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    ) {
    this.startRobot();
  }

  startRobot() {
    this.bot = new Wechaty({
      name: config.name,
      puppet: new PuppetPadplus({
        token: config.token,
      }),
    });
    this.bot.on('scan', onScan)
    this.bot.on('login', onLogin)
    this.bot.on('logout', onLogout)
    this.bot.on('message', onMessage)
    this.bot.start()
      .then(() => log.info('StarterBot', 'Starter Bot Started.'))
      .catch(e => log.error('StarterBot', e))
  }
}

import { Inject } from '@nestjs/common'
import { configure, getLogger, Logger } from 'log4js'
import { formatRes, formatError, formatReqLog } from './log.utils'
import {logConfig} from './log4j.config'
import { ConfigService } from '../config.service'

export class LoggerService {
  private readonly resLogger: Logger
  private readonly errorLogger: Logger
  private readonly infoLogger: Logger

  constructor( @Inject(ConfigService) private readonly config: ConfigService ) {
    configure(logConfig(config.get('logPath')))
    this.resLogger = getLogger('resLogger')
    this.errorLogger = getLogger('errorLogger')
    this.infoLogger = getLogger()
  }

  info(...info) {
    if (info && info.length > 0) {
      let logs = ''
      info.forEach(item => {
        logs += typeof item === 'object' ? JSON.stringify(item) : item + '  '
      })
      this.infoLogger.info(logs)
    }
  }

  error(ctx, error, resTime) {
    if (ctx && error) {
      this.errorLogger.error(formatError(ctx, error, resTime))
    }
  }

  resp(ctx) {
    if (ctx) {
      this.resLogger.info(formatRes(ctx))
    }
  }

  req(ctx, resTime) {
    if (ctx) {
      this.resLogger.info(formatReqLog(ctx, resTime))
    }
  }
}

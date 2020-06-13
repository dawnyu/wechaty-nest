import { LoggerService } from './log.service'
import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})

export class LogModule {}

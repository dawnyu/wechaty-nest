import { Module, Global } from '@nestjs/common';
import { ConfigService } from './service/config.service';
import { LoggerService } from './service/logger/log.service'

@Global()
@Module({
  imports: [],
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService()
  }, LoggerService],
  exports: [ConfigService, LoggerService]
})
export class SharedModule {}

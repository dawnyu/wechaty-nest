import { Controller, Inject, Get, Req } from '@nestjs/common'
import { RobotService } from './robot.service';
import { LoggerService } from '../shared/service/logger/log.service'

@Controller('')
export class RobotController {
  constructor(
    private readonly robotService: RobotService,
    @Inject(LoggerService) readonly logger: LoggerService
  ) {
  }

  @Get('startRobot')
  async startRobot(@Req() req) {
    const result = await this.robotService.startRobot()
    this.logger.info('response--', result)
  }
}

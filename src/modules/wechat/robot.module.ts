import { Module } from '@nestjs/common';
import { RobotController} from './robot.controller'
import { RobotService } from './robot.service'
@Module({
  imports: [],
  controllers: [RobotController],
  exports: [RobotService],
  providers: [RobotService]
})
export class RobotModule {
}

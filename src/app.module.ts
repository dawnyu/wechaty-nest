import { Module} from '@nestjs/common'
import { SharedModule } from './modules/shared/shared.module'
import { RobotModule } from './modules/wechat/robot.module'

@Module({
  imports: [
    SharedModule,
    RobotModule,
    ],
})
export class AppModule {
}

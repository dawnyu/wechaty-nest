import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import compression from 'compression'
import helmet from 'helmet'
import { ConfigService } from './modules/shared/service/config.service';
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { ResponseInterceptor } from './common/interceptors/reponse.interceptor'
import { GLOBAL_ROUTER_PREFIX } from './common/const/index'

async function bootstrap() {
  const port = ConfigService.get('port')
  const app = await NestFactory.create(AppModule)
  app.use(compression())
  app.enableCors()
  app.use(
    helmet({
      contentSecurityPolicy: false,
      dnsPrefetchControl: false,
      frameguard: false,
      hidePoweredBy: true,
      hpkp: false,
      hsts: false,
      ieNoOpen: false,
      noCache: false,
      noSniff: false,
      referrerPolicy: false,
      xssFilter: false,
      expectCt: false,
      permittedCrossDomainPolicies: false,
    })
  )
  app.setGlobalPrefix(GLOBAL_ROUTER_PREFIX)
  app.startAllMicroservicesAsync()
  app.useGlobalFilters(new AllExceptionsFilter(null))
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(port)
}
bootstrap()

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly status: number
  private readonly message: string
  constructor(exception) {
    this.status = exception && exception.status
    this.message = exception && exception.message
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.status || 500
    let message = exception.message || ''
    if (typeof message === 'string') {
      message = message.replace('Error: ', '')
    }
    console.log('error-------', message)
    if (status === 401) {
      message = '登录超时，请重新登录'
    }
    if (status === 500) {
      message = message || '网络开小差，请稍后再试'
    }
    response
      .status(status)
      .json({
        code: 1,
        message,
        timestamp: new Date().getTime(),
      })
  }
}

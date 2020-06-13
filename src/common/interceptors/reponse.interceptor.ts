import { ResStatusEnum } from '../enum/status.enum';
import { CommonResponse } from '../const/types';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, CommonResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<CommonResponse<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          code: ResStatusEnum.OK,
          data,
          message: 'ok',
        };
      }),
    );
  }
}

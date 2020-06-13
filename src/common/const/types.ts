import { ResStatusEnum } from '../enum/status.enum';
export interface CommonResponse<T = null> {
  code: ResStatusEnum;
  data: T;
  message: string;
}

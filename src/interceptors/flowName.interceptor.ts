import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { FlowService } from '../flow/flow.service';

@Injectable()
export class flowNameInterceptor implements NestInterceptor {
  constructor(private flowService: FlowService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return this.flowService.flowIdtoName(data);
      }),
    );
  }
}

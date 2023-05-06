import { Expose } from 'class-transformer';

export class UserFlowDto {
  @Expose()
  idx: number;

  @Expose()
  user_idx: number;

  @Expose()
  flow_id: number;

  @Expose()
  amount: number;

  @Expose()
  flow_date: Date;

  @Expose()
  flowName: Date;
}

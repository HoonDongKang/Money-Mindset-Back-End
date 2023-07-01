import { Expose } from 'class-transformer';

export class UserFlowDetail {
  @Expose()
  idx: number;

  @Expose()
  flow_idx: number;

  @Expose()
  detail: number;

  @Expose()
  lat: number;

  @Expose()
  lng: Date;
}

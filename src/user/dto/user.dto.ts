import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  idx: number;

  @Expose()
  email: string;

  @Expose()
  nickname: string;
}

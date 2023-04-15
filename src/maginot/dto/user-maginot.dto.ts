import { Expose } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class UserMaginotDto {
  @Expose()
  idx: number;

  @Expose()
  user_idx: number;

  @Expose()
  ranking: number;

  @Expose()
  goal: string;

  @Expose()
  amount: number;

  @Expose()
  line: number;

  @Expose()
  user: UserDto;
}

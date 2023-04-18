import { Expose } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class AssetDto {
  @Expose()
  user_idx: number;

  @Expose()
  amount: number;

  @Expose()
  user: UserDto;
}

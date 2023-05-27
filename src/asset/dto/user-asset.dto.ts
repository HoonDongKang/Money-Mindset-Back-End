import { Expose } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class AssetDto {
  //Fixed_Expenditure
  @Expose()
  idx: number;

  @Expose()
  fixed_expenditure: string;

  @Expose()
  expenditure_amount: number;

  @Expose()
  expenditure_date: string;

  //Asset
  @Expose()
  user_idx: number;

  @Expose()
  amount: number;

  @Expose()
  user: UserDto;

  @Expose()
  fixedExpenditureAmount?: number;
  @Expose()
  userFlowSum?: number;
}

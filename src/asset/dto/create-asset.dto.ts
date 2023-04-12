import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ name: 'amount', example: 100000 })
  @IsNumber()
  amount: number;
}

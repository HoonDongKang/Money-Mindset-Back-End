import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({
    name: 'user_idx',
    example: 1,
  })
  user_idx: number;

  @ApiProperty({ name: 'amount', example: 100000 })
  amount: number;
}

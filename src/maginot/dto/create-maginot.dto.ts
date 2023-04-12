import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMaginotDto {
  @ApiProperty({ name: 'ranking', example: 1 })
  @IsNumber()
  ranking: number;

  @ApiProperty({ name: 'goal', example: 'mac' })
  @IsString()
  goal: string;

  @ApiProperty({ name: 'amount', example: 100000 })
  @IsNumber()
  amount: number;
}

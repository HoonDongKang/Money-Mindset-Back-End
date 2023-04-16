import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExpenditureDto {
  @ApiProperty({ name: 'user_idx', example: '1' })
  @IsOptional()
  @IsNumber()
  user_idx?: number;

  @ApiProperty({ name: 'fixed_expenditure', example: 'food' })
  @IsString()
  fixed_expenditure: string;

  @ApiProperty({ name: 'expenditure_amount', example: 1000 })
  @IsNumber()
  expenditure_amount: number;
}

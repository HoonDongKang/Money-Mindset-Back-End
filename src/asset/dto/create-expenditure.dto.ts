import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExpenditureDto {
  @ApiProperty({ name: 'fixed_expenditure', example: 'food' })
  @IsString()
  fixed_expenditure: string;

  @ApiProperty({ name: 'expenditure_amount', example: 1000 })
  @IsNumber()
  expenditure_amount: number;

  @ApiProperty({ name: 'expenditure_date', example: '15' })
  @IsString()
  expenditure_date: string;
}

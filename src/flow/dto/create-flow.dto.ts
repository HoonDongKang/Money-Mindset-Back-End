import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateFlowDto {
  @ApiProperty({ name: 'flow_id', example: 1 })
  @IsNumber()
  flow_id: number;

  @ApiProperty({ name: 'amount', example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ name: 'flow_date', example: '2023.04.26' })
  @IsDateString()
  flow_date: Date;
}

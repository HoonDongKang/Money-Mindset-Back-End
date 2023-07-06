import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FlowDetailData {
  @ApiProperty({ name: 'detail', example: 'April' })
  @IsOptional()
  @IsString()
  detail: string;

  @ApiProperty({ name: 'lat', example: 35.891374797181705 })
  @IsOptional()
  @IsNumber()
  lat: number;

  @ApiProperty({ name: 'lng', example: 128.6151231834401 })
  @IsOptional()
  @IsNumber()
  lng: number;
}

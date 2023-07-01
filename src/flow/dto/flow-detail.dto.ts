import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class FlowDetailData {
  // @ApiProperty({ name: 'flow_id', example: 1 })
  // @IsNumber()
  // flow_id: number;

  @ApiProperty({ name: 'detail', example: 'April' })
  @IsString()
  detail: string;

  @ApiProperty({ name: 'lat', example: 35.891374797181705 })
  @IsNumber()
  lat: number;

  @ApiProperty({ name: 'lng', example: 128.6151231834401 })
  @IsNumber()
  lng: number;
  // @ApiProperty({ name: 'location', example: { lat: 1, lng: 1 } })
  // location: {
  //   lat: any;
  //   lng: any;
  // };
}

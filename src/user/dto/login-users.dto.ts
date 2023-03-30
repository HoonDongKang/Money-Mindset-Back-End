import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sample@naver.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password?: string;
}

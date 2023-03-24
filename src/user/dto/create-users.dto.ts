import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    example: 'sample@naver.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ name: 'password', required: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'nickname' })
  nickname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ name: 'refresh token' })
  refreshToken: string;
}

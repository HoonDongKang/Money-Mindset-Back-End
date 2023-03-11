import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'User Email',
    example: 'sample@naver.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ name: 'password', description: 'User PW', required: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'nickname', description: 'User Nickname' })
  nickname: string;
}

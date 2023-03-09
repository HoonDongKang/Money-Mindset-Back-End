import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'id', description: 'User ID' })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ name: 'password', description: 'User PW', required: false })
  password: string;

  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'User Email',
    example: 'sample@naver.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'nickname', description: 'User Nickname' })
  nickname: string;
}

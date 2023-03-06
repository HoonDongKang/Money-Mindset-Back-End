import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';
import { IsEmail } from 'class-validator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  findAllUser() {
    return this.userService.findAll();
  }
  @Get(':idx')
  findOneUser(@Param('idx') idx: string) {
    return this.userService.findOne(parseInt(idx));
  }

  @Delete('/:idx')
  removeUser(@Param('idx') idx: string) {
    return this.userService.removeUser(parseInt(idx));
  }

  @Patch(':idx')
  updateUser(@Param('idx') idx: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(parseInt(idx), updateUserDto);
  }

  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @Post('/email')
  verifyEmail(@Body() body: { email: string }) {
    return this.authService.emailVerify(body.email);
  }

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}

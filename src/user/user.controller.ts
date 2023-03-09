import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-users.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: `Get all users' info` })
  @Get()
  findAllUser() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: `Get user's info` })
  @Get(':idx')
  findOneUser(@Param('idx', ParseIntPipe) idx: number) {
    return this.userService.findOne(idx);
  }

  @ApiOperation({ summary: `Delete user's info` })
  @Delete('/:idx')
  removeUser(@Param('idx', ParseIntPipe) idx: number) {
    return this.userService.removeUser(idx);
  }

  @ApiOperation({
    summary: `Update user's info`,
    description: `All values are optional`,
  })
  @Patch(':idx')
  updateUser(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(idx, updateUserDto);
  }

  @ApiOperation({
    summary: `Verifying user's email`,
    description: `If email is in use, API returns true.`,
  })
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

  @ApiOperation({
    summary: `Create a new user`,
  })
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({
    summary: `Signin API`,
  })
  @Post('/signin')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }
}

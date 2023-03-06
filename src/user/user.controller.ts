import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-users.dto';

@Controller('user')
@ApiTags('user')
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
  findOneUser(@Param('idx') idx: string) {
    return this.userService.findOne(parseInt(idx));
  }

  @ApiOperation({ summary: `Delete user's info` })
  @Delete('/:idx')
  removeUser(@Param('idx') idx: string) {
    return this.userService.removeUser(parseInt(idx));
  }

  @ApiOperation({
    summary: `Update user's info`,
    description: `All values are optional`,
  })
  @Patch(':idx')
  updateUser(@Param('idx') idx: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(parseInt(idx), updateUserDto);
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

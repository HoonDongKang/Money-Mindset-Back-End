import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-users.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response, Request as expReq } from 'express';
import { JwtRefreshAuthGuard } from 'src/auth/refresh-jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: `Get all users' info` })
  @Get()
  @Serialize(UserDto)
  findAllUser() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get profile from jwt' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/validate')
  async getProfile(@Request() req) {
    //req user 정보 이용해서 쿠키 담기
    return req.user;
  }

  @ApiOperation({ summary: 'get access token after refresh token comparison' })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh')
  async getAccessToken(@Req() req: expReq) {
    return await this.authService.refreshAccessToken(
      req.cookies['refresh_token'],
    );
  }

  @ApiOperation({ summary: `Get user's info` })
  @Get(':idx')
  @Serialize(UserDto)
  findOneUser(@Param('idx', ParseIntPipe) idx: number) {
    return this.userService.findOneByIdx(idx);
  }

  @ApiOperation({ summary: `Delete user's info` })
  @Delete('/:idx')
  @Serialize(UserDto)
  removeUser(@Param('idx', ParseIntPipe) idx: number) {
    return this.userService.removeUserById(idx);
  }

  @ApiOperation({
    summary: `Update user's info`,
    description: `All values are optional`,
  })
  @Patch(':idx')
  @Serialize(UserDto)
  updateUser(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserByIdx(idx, updateUserDto);
  }

  @ApiOperation({
    summary: `Verifying user's email`,
    description: `If email is in use, API returns true.`,
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'sample@naver.com' },
      },
    },
  })
  @Post('/email')
  verifyEmail(@Body() body: { email: string }) {
    return this.userService.checkEmailDuplicate(body.email);
  }

  @ApiOperation({
    summary: `Update user's password when lost`,
    description: ``,
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'sample@naver.com' },
        changedPw: { type: 'string', example: 'changed password' },
      },
    },
  })
  @Post('/forget')
  forgetPassword(@Body() body: { email: string; changedPw: string }) {
    return this.userService.forgotPw(body.email, body.changedPw);
  }

  @ApiOperation({
    summary: `Create a new user`,
  })
  @Post('/signup')
  @Serialize(UserDto)
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { refreshToken, user, accessToken } = await this.authService.signup(
      createUserDto,
    );
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });
    return res.send({
      user,
      accessToken,
      refreshToken,
    });
  }

  @ApiOperation({
    summary: `Signin API`,
  })
  @Post('/signin')
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { refreshToken, IsEqual, accessToken } =
      await this.authService.signin(loginDto);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });
    return res.send({
      IsEqual,
      accessToken,
      refreshToken,
    });
  }
}

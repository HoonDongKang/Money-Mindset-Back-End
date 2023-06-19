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
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-users.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request as expReq } from 'express';
import { JwtRefreshAuthGuard } from '../auth/refresh-jwt-auth.guard';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';

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
  @Delete(':idx')
  async removeUser(
    @Res() res: Response,
    @Param('idx', ParseIntPipe) idx: number,
  ) {
    res.cookie('refresh_token', '', { maxAge: 0 });
    const user = await this.userService.removeUserById(idx);
    return res.send(user);
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
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
      sameSite: 'lax',
      path: '/',
    });
    return res.send({
      user,
      accessToken,
      refreshToken,
    });
  }

  @ApiOperation({
    summary: `Login with an account`,
  })
  @Post('/signin')
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { refreshToken, isEqual, accessToken } =
      await this.authService.signin(loginDto);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
      sameSite: 'lax',
      path: '/',
    });
    return res.send({
      isEqual,
      accessToken,
      refreshToken,
    });
  }
  @ApiOperation({
    summary: `Google login`,
    description: `Redirect to Google login page`,
  })
  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  googleAuth(@Req() req: Request) {
    //여기로 접속하면
    return { msg: 'Google Authentication' };
  }

  @ApiOperation({
    summary: `Google login redirect page`,
    description: `After login successes, redirect to localhost:3000`,
  })
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // 인증 완료시 여기로 정보가 보내짐
    // jwt 생성 로직 필요
    const { refreshToken } = req.user;
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
      sameSite: 'lax',
      path: '/',
    });
    res.redirect(`http://localhost:3000/`);
  }

  @ApiOperation({
    summary: `Logout from account.`,
    description: `Delete refresh_token in cookie.`,
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/logout/:idx')
  async logOut(@Res() res: Response, @Param('idx', ParseIntPipe) idx: number) {
    await this.authService.logOut(idx);
    res.cookie('refresh_token', '', { maxAge: 0 });
    return res.redirect('/');
  }
}

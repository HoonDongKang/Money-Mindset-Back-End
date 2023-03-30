import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-users.dto';
import * as bcyrpt from 'bcrypt';
import { LoginDto } from '../user/dto/login-users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './../user/dto/user.dto';
import { UserService } from './../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async bcryptHashed(data: string) {
    const salt = await bcyrpt.genSalt(10);
    const hasedData = await bcyrpt.hash(data, salt);

    return hasedData;
  }

  async bcryptCompare(data: string, hashedData: string) {
    const IsEqual = await bcyrpt.compare(data, hashedData);
    return IsEqual;
  }

  // After verifying email, if there's no email in use
  async signup(createUserDto: CreateUserDto) {
    const { email, nickname, password } = createUserDto;
    let user: Partial<User>;
    if (password) {
      const hashedPassword = await this.bcryptHashed(password);
      user = await this.userService.createUser(email, nickname, hashedPassword);
    } else {
      user = await this.userService.createUser(email, nickname);
    }

    const { accessToken } = this.generateAccessToken({
      idx: user.idx,
      email: user.email,
      nickname: user.nickname,
    });
    const { refreshToken } = this.generateRefreshToken(user.idx);
    await this.userService.updateUserByIdx(user.idx, { refreshToken });

    return { user, accessToken, refreshToken };
  }

  async signin(logindto: LoginDto) {
    const { email, password } = logindto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid Email');
    }
    const IsEqual = await this.bcryptCompare(password, user.password);
    if (!IsEqual) {
      throw new BadRequestException('Invalid PW');
    } else {
      const { accessToken } = this.generateAccessToken({
        idx: user.idx,
        email: user.email,
        nickname: user.nickname,
      });
      const { refreshToken } = this.generateRefreshToken(user.idx);
      await this.userService.updateUserByIdx(user.idx, { refreshToken });
      return {
        IsEqual,
        accessToken,
        refreshToken,
      };
    }
  }

  async logOut(idx: number) {
    await this.userService.updateUserByIdx(idx, { refreshToken: null });
    return true;
  }

  generateAccessToken(userDto: UserDto) {
    const accessToken = this.jwtService.sign(userDto, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });
    return { accessToken };
  }

  generateRefreshToken(idx: number) {
    const paylaod = { idx };
    const refreshToken = this.jwtService.sign(paylaod, {
      secret: this.configService.get<string>('RT_JWT_SECRET'),
      expiresIn: '7d',
    });
    return { refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    const payload: any = this.jwtService.decode(refreshToken);
    const user = await this.userService.findOneByIdx(payload.idx);
    if (refreshToken === user.refreshToken) {
      const accesstoken = this.generateAccessToken({
        idx: user.idx,
        nickname: user.nickname,
        email: user.email,
      });
      return accesstoken;
    } else {
      return false;
    }
  }

  compareTokenExpiration(exp: number) {
    const time = new Date().getTime() / 1000;
    const isExpired = exp < time ? true : false;
    return isExpired;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}

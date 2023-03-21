import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-users.dto';
import * as bcyrpt from 'bcrypt';
import { LoginDto } from '../user/dto/login-users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './../user/dto/user.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async emailVerify(email: string) {
    let isExisted = true;
    const user = await this.prisma.user.findFirst({ where: { email } });
    !user ? (isExisted = false) : (isExisted = true);
    return { isExisted };
  }

  // After verifying email, if there's no email in use
  async signup(createUserDto: CreateUserDto) {
    const { email, nickname, password } = createUserDto;
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: { email, nickname, password: hashedPassword },
    });

    return user;
  }

  async signin(logindto: LoginDto) {
    const { email, password } = logindto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid Email');
    }
    const IsEqual = await bcyrpt.compare(password, user.password);
    if (!IsEqual) {
      throw new BadRequestException('Invalid PW');
    } else {
      const { accessToken, refreshToken } = this.generateToken({
        idx: user.idx,
        email: user.email,
        nickname: user.nickname,
      });
      await this.userService.updateUserByIdx(user.idx, { refreshToken });
      return {
        IsEqual,
        refreshToken,
      };
    }
  }

  generateToken(userDto: UserDto) {
    const { idx, email, nickname } = userDto;
    const payload = { idx, email, nickname };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    const refreshTokenPayload = { idx };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: this.configService.get<string>('RT_JWT_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(idx: number, accessToken: string) {
    const user = await this.userService.findOneByIdx(idx);
  }
}

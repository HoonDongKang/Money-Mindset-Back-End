import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UserService } from './user.service';
import * as bcyrpt from 'bcrypt';
import { LoginDto } from './dto/login-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
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
    // if (user && (await bcyrpt.compare(password, user.password))) {
    //   const payload = { id };
    //   const accessToken = await this.jwtService.sign(payload);
    //   return { accessToken };
    // } else {
    //   throw new BadRequestException(`Invalid account`);
    if (!user) {
      throw new BadRequestException('Invalid Email');
    }
    const IsEqual = await bcyrpt.compare(password, user.password);
    if (!IsEqual) {
      throw new BadRequestException('Invalid PW');
    } else {
    }
    return { IsEqual };
  }
}

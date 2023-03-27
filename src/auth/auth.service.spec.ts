import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AccessTokenStrategy } from './ accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UserService>;
  beforeEach(async () => {
    //create a fake cope of the user service
    const users: User[] = [];
    fakeUsersService = {
      findOneByIdx: (idx: number) => {
        const filterUser = users.find((user) => user.idx === idx);
        return Promise.resolve(filterUser);
      },
      createUser: (email: string, nickname: string, password: string) => {
        const user = {
          idx: 1,
          email,
          nickname,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({}), ConfigModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: fakeUsersService },
        // ConfigService,
        PrismaService,
        // AccessTokenStrategy,
        // RefreshTokenStrategy,
        // JwtService,
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup({
      email: 'test@test.com',
      nickname: 'test',
      password: 'test',
      refreshToken: '',
    });
  });
});

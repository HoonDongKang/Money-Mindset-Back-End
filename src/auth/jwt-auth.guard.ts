import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('accessToken') {}

export class JwtRefreshAuthGuard extends AuthGuard('refreshToken') {}

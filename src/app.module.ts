import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from './asset/asset.module';
import { MaginotModule } from './maginot/maginot.module';
import { ExpenditureService } from './asset/expenditure.service';
import { ExpenditureModule } from './asset/expenditure.module';
import { MoneyFlowModule } from './money-flow/money-flow.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AssetModule,
    MaginotModule,
    ExpenditureModule,
    MoneyFlowModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

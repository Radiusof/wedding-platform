import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisProvider } from './redis.provider';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { UsersControllerGateway } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    AuthModule,
  ],
  controllers: [AppController, UsersControllerGateway],
  providers: [AppService, RedisProvider],
})
export class AppModule {}

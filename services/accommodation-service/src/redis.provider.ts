import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => new Redis(configService.get<string>('REDIS_URL')),
};
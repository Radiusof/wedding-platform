import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    return new Redis(redisUrl);
  },
};
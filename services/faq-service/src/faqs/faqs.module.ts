import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { Faq, FaqSchema } from './schemas/faq.schema';
import { RedisProvider } from '../redis.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Faq.name, schema: FaqSchema }
    ])
  ],
  controllers: [FaqsController],
  providers: [FaqsService, RedisProvider],
  exports: [FaqsService],
})
export class FaqsModule {} 
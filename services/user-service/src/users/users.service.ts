import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Redis } from 'ioredis';
import { EVENT_CHANNELS } from '../events';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('REDIS_CLIENT') private redisClient: Redis,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Email already used');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      ...dto,
      password: hash,
    });
    await user.save();

    const event = {
      eventType: 'user.created',
      timestamp: new Date().toISOString(),
      data: {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
    await this.redisClient.publish(EVENT_CHANNELS.USER, JSON.stringify(event));

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly userServiceUrl: string;
  constructor(private http: HttpService, configService: ConfigService) {
    this.userServiceUrl = configService.get<string>('USER_SERVICE_URL', 'http://user-service:3001');
  }

  async register(dto: RegisterDto) {
    const { data } = await firstValueFrom(this.http.post(`${this.userServiceUrl}/auth/register`, dto));
    return data;
  }

  async login(dto: LoginDto) {
    const { data } = await firstValueFrom(this.http.post(`${this.userServiceUrl}/auth/login`, dto));
    return data;
  }
}
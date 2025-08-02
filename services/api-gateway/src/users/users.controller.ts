import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersControllerGateway {
  private readonly userServiceUrl: string;
  constructor(private http: HttpService, configService: ConfigService) {
    this.userServiceUrl = configService.get<string>('USER_SERVICE_URL', 'http://user-service:3001');
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.userServiceUrl}/users/${id}`, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return data;
  }
}
import { All, Controller, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Request, Response } from 'express';

@Controller('accommodations')
export class AccommodationsController {
  private readonly baseUrl: string;
  constructor(private http: HttpService, config: ConfigService) {
    this.baseUrl = config.get<string>('ACCOMMODATION_SERVICE_URL', 'http://accommodation-service:3004');
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    try {
      const { method, originalUrl, body, headers } = req;
      const response = await firstValueFrom(
        this.http.request({
          method: method as any,
          url: `${this.baseUrl}${originalUrl}`,
          data: body,
          headers: { ...headers, host: undefined },
        }),
      );
      res.status(response.status).send(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).send(error.response?.data || { message: 'Internal error' });
    }
  }
}
import { All, Controller, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Request, Response } from 'express';

@Controller('faqs')
export class FaqsController {
  private readonly baseUrl: string;
  constructor(private http: HttpService, config: ConfigService) {
    this.baseUrl = config.get<string>('FAQ_SERVICE_URL', 'http://faq-service:3002');
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
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: 'Internal error' };
      res.status(status).send(data);
    }
  }
}
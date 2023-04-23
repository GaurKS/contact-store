import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const apiTimeStart: any = new Date();
    let apiTimeEnd: any;
    response.on('finish', () => {
      apiTimeEnd = new Date();
      const { ip, method, originalUrl } = request;
      const userAgent = request.get('user-agent') || '';
      const { statusCode, statusMessage } = response;
      const msec = Math.abs(apiTimeStart - apiTimeEnd);
      const message = `[HTTP] | ${method} ${originalUrl} ${statusCode} | ${statusMessage} | ${userAgent} ${ip} | ${msec}ms`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      return this.logger.log(message);
    });

    next();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async test() {
    return await `Server is up and running 🚀 at port: ${process.env.PORT}`;
  }
}

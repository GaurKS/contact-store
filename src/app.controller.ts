import { Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  async test() {
    return await this.appService.test();
  }

  @Post()
  async createUser() {}

  @Get()
  async getUser() {}

  @Get()
  async searchUser() {}

  @Patch()
  async updateUser() {}
}

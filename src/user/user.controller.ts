import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // to check the server running status
  @Get('test')
  async test() {
    return await this.userService.test();
  }

  // to create a new user in the database
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto[]) {
    return await this.userService.createUser(createUserDto);
  }

  // to get a user from the database using phone, email, or instagram handle
  @Get()
  async getUserByQuery(
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('instagram') instagram: string,
  ) {
    return await this.userService.getUserByQuery(email, phoneNumber, instagram);
  }

  // to get a single user from the database by subscribed company
  // @Get()
  // async searchUserByCompany() {
  //   return await this.userService.searchUserByCompany();
  // }

  // to update a user in the database by objectId
  // @Patch(':id')
  // async updateUser() {
  //   return await this.userService.updateUser();
  // }
}

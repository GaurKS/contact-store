import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async test() {
    return await `Server is up and running 🚀 at port: ${process.env.PORT}`;
  }

  async createUser(createUserDto: Array<CreateUserDto>) {
    try {
      // Todo: Also handle multiple user creation
      const user = [];
      if (createUserDto.length > 1) {
        for (let i = 0; i < createUserDto.length; i++) {
          if (
            (!createUserDto[i].email || createUserDto[i].email === '') &&
            (!createUserDto[i].phoneNumber ||
              createUserDto[i].phoneNumber === '') &&
            (!createUserDto[i].instagram || createUserDto[i].instagram === '')
          ) {
            console.error(
              'At least one of email, phoneNumber or instagram is required',
            );
            throw new BadRequestException(
              'At least one of email, phoneNumber or instagram is required',
            );
          }
          const { email, phoneNumber, instagram } = createUserDto[i];
          const existingUser = await this.userRepository.findOne({
            where: [{ email }, { phoneNumber }, { instagram }],
          });
          if (existingUser) {
            console.error('User already exists');
            throw new BadRequestException('User already exists');
          }
          const newUser = await this.userRepository.save(createUserDto[i]);
          user.push(newUser);
        }
        return {
          statusCode: 201,
          message: 'Contact created successfully',
          data: user,
        };
      } else {
        if (
          (!createUserDto[0].email || createUserDto[0].email === '') &&
          (!createUserDto[0].phoneNumber ||
            createUserDto[0].phoneNumber === '') &&
          (!createUserDto[0].instagram || createUserDto[0].instagram === '')
        ) {
          console.error(
            'At least one of email, phoneNumber or instagram is required',
          );
          throw new BadRequestException(
            'At least one of email, phoneNumber or instagram is required',
          );
        }
        const { email, phoneNumber, instagram } = createUserDto[0];
        const existingUser = await this.userRepository.findOne({
          where: [{ email }, { phoneNumber }, { instagram }],
        });
        if (existingUser) {
          console.error('User already exists');
          throw new BadRequestException('User already exists');
        }

        const user = await this.userRepository.save(createUserDto);
        return {
          statusCode: 201,
          message: 'Contact created successfully',
          data: user,
        };
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message);
    }
  }

  async getUserByQuery(email: string, phoneNumber: string, instagram: string) {
    try {
      if (!email && !phoneNumber && !instagram) {
        console.error(
          'At least one of email, phoneNumber or instagram is required',
        );
        throw new BadRequestException(
          'At least one of email, phoneNumber or instagram is required',
        );
      }
      const user = await this.userRepository.findOne({
        where: [{ email }, { phoneNumber }, { instagram }],
      });
      if (!user) {
        console.error('User not found');
        throw new BadRequestException('User not found');
      }
      return {
        statusCode: 200,
        message: 'User found',
        data: user,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }
}

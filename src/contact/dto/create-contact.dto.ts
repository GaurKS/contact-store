import { IsEmail } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserAddressProp {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  pincode: number;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class CreateContactDto {
  constructor(partial?: Partial<CreateContactDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserAddressProp)
  address?: UserAddressProp;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;
}

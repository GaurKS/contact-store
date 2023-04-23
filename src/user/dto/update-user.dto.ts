import { UserAddressProp } from './create-user.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  upiVpa?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserAddressProp)
  address?: UserAddressProp;
}

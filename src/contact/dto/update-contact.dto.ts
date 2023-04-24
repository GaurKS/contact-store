import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateContactDto {
  constructor(partial?: Partial<UpdateContactDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  instagram?: string;
}

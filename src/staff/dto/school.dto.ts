import {
  IsArray,
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  isString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  documents: string[];

  @IsString()
  @IsNotEmpty()
  staffType: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

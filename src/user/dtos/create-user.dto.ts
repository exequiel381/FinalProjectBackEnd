import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsOptional,
    IsArray,
    IsEnum,
    IsInt,
    IsNumber,
    IsNotEmpty,
  } from 'class-validator';
import { AppRoles } from '../../app.roles';
//   import { AppRoles } from '../app.roles';
  import { EnumToString } from '../../common/helpers/enumToString';
import { localityDto } from '../../location/dtos/localityDto.dto';

  export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsNotEmpty()
    locality : localityDto

    @IsArray()
    @IsEnum(AppRoles, {
      each: true,
      message: `must be a valid role value, ${EnumToString(AppRoles)}`,
    })
    roles: string[];
  }
  
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
  import { EnumToString } from 'src/common/helpers/enumToString';


  export class CreateReactionDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    description: string;
  
    @IsInt()
    @IsNotEmpty()
    postId : number

  }
  
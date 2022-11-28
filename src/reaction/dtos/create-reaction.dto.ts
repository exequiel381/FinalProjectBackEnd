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
  import { EnumToString } from '../../common/helpers/enumToString';
import { LineRectionDto } from './line-reaction.dto';


  export class CreateReactionDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    description: string;
  
    @IsInt()
    @IsNotEmpty()
    postId : number

    @IsArray()
    @IsNotEmpty()
    linesReactionDto : LineRectionDto[]

  }
  
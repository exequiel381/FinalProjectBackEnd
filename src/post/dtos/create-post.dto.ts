import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { EnumToString } from '../../common/helpers/enumToString';
import { PostCategory } from '../enums';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  type_id: number;
  
  @IsString()
  category_id: number;
  
  // @IsOptional()
  // @IsBoolean()
  // status: boolean;
  
  // @IsNotEmpty() // EJEMPLO AL RECIBIR UN ENUM
  // @IsEnum(PostCategory, {
  //   message: `Invalid option. Valids options are ${EnumToString(PostCategory)}`,
  // })
  // category: string;

 
}

import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
 
} from 'class-validator';
import { ImagePost } from '../entities/images-post.entity';
import { CategoryDto } from './category-post.dto';
import { LinePostDto } from './line-post.dto';
import { TypePostDto } from './type-post.dto';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  type: TypePostDto;
  
  @IsArray()
  LinesPostDto : LinePostDto[];
  
  @IsNotEmpty()
  typeNumber: number;

}

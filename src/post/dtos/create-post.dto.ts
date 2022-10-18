import {
  IsNotEmpty,
  IsString,
  IsArray,
 
} from 'class-validator';
import { CategoryDto } from './category-post.dto';
import { LinePostDto } from './line-post.dto';
import { TypePostDto } from './type-post.dto';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  type: TypePostDto;
  
  @IsNotEmpty()
  category: CategoryDto;
  
  @IsArray()
  LinesPostDto : LinePostDto[];
  

}

import {
  IsNotEmpty,
  IsString,
  IsArray,
 
} from 'class-validator';
import { LinePostDto } from './line-post.dto';
import { TypePostDto } from './type-post.dto';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  movilityString: string;

  
  movility: boolean;

  type: TypePostDto;
  
  @IsArray()
  LinesPostDto : LinePostDto[];
  
  @IsNotEmpty()
  typeNumber: number;

}

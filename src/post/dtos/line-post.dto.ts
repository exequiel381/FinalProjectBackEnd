import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryDto } from "./category-post.dto";

export class LinePostDto{
  @IsString()
  description: string;

  @IsNumber()
  cantidad: number;

  category: CategoryDto;

  // @IsOptional()
  // categoryNumber: number;
}
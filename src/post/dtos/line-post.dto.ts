import { IsNumber, IsString } from "class-validator";

export class LinePostDto{
  @IsString()
  description: string;

  @IsNumber()
  cantidad: number;

}
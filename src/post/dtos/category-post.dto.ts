import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsNumber
   
  } from 'class-validator';

export class CategoryDto{
    @IsNumber()
    @IsNotEmpty()
    id : number;
}
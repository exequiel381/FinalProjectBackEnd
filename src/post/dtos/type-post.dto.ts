import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsNumber
   
  } from 'class-validator';

export class TypePostDto{
    @IsNumber()
    @IsNotEmpty()
    id : number;
}
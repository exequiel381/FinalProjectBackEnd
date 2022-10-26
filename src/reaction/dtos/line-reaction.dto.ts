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
  
  export class LineRectionDto {
    @IsNumber()
    @IsNotEmpty()
    requestQuantity : number; //VER CUANDO LA CANTIDAD SEA MAYOR A LA OFRECIDA

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    idLinePost : number;//VER CUANDO NOS MANDEN UN ID QUE NO PERTENEZCA A UNA LINEA DE POST
  }
  
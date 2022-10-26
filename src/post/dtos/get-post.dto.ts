import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class GetPostDto extends PartialType(
  OmitType(CreatePostDto, [] as const),//quitamos propiedasdes para que este dto las ignore, //en los [] ponemos las prop ej: 'title'
) {}

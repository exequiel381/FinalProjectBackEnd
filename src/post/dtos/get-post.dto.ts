import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class GetPostDto extends PartialType(
  OmitType(CreatePostDto, ['slug','excerpt','content','category','tags','status'] as const),//quitamos propiedasdes para que este dto las ignore,
) {}

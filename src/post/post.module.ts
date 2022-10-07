import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category,Post } from './entities';
import { ImagePost } from './entities/images-post.entity';
import { TypePost } from './entities/type-post.entity';
import { LineaPost } from './entities/lineaPost.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Post,Category,ImagePost,TypePost,LineaPost])],
  controllers: [PostController],//definimos los controladores , para que sean instanciados
  providers: [PostService]
})
export class PostModule {}

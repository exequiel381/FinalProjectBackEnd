import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities';
import { LineaPost } from 'src/post/entities/lineaPost.entity';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { Reaction } from './entities';
import { LineReaction } from './entities/lineReaction.entity';

@Injectable()
export class ReactionService {

    constructor(
        @InjectRepository(Reaction)
        private readonly reactionRepository: Repository<Reaction>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(LineaPost)
        private readonly linePostRepository: Repository<LineaPost>,
      ) {}

    async createOne(dto: CreateReactionDto, author: User) {
        let reaction = this.reactionRepository.create({ ...dto });
        let post = await this.postRepository.findOne(dto.postId);
        post.lines = await this.linePostRepository.find({
          where :{
            post : post, 
          }
        })
        // if (post.author.id === author.id) throw new NotFoundException('No puedes crear una reaccion a tu propio Post');
        let lines = [];
        dto.linesReactionDto.forEach(element => {
          lines.push(post.createReactionLine(element.idLinePost,element.requestQuantity))
        });
        reaction.lines = lines;
        reaction.post = post;
        reaction.user = author;
        return await (await this.reactionRepository.save(reaction)).lines;
    }


    async getReactionsByPostId(id: number) {
        const post = await this.postRepository
          .findOne(id)
        return post.reactions;
    }

}

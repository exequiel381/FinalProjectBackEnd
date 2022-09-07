import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { Reaction } from './entities';

@Injectable()
export class ReactionService {

    constructor(
        @InjectRepository(Reaction)
        private readonly reactionRepository: Repository<Reaction>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
      ) {}

    async createOne(dto: CreateReactionDto, author: User) {
        let reaction = this.reactionRepository.create({ ...dto });
        let post = await this.postRepository.findOne(dto.postId);
        if (post.author.id === author.id) throw new NotFoundException('No puedes crear una reaccion a tu propio Post');
        reaction.post = post;
        reaction.user = author;
        return await this.reactionRepository.save(reaction);
    }


    async getReactionsByPostId(id: number) {
        const post = await this.postRepository
          .findOne(id)
        return post.reactions;
    }

}

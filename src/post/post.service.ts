import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Post } from './entities';
import { CreatePostDto, EditPostDto } from './dtos';
import { User } from 'src/user/entities';
import { ImagePost } from './entities/images-post.entity';
import { TypePost } from './entities/type-post.entity';
import { LineaPost } from './entities/lineaPost.entity';
import { PostStates } from 'src/config/constants';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(LineaPost)
    private readonly linePostRepository: Repository<LineaPost>,
    
  ) {}

  async getMany() {
    return await this.postRepository.find();
  }

  async getById(id: number, author?: User) {
    const post = await this.postRepository
      .findOne(id)
      .then(p => (!author ? p : !!p && author.id === p.author.id ? p : null));
    let linesPost = await this.linePostRepository.find({
      where :{
        post : post, 
      }
    })
    post.lines = linesPost;
    if (!post)
      throw new NotFoundException('Post does not exist or unauthorized');
    return post;
  }

  async getPostByUser(user?: User) {
    return await this.postRepository
        .find({
          where :{
            author : user,
          }
        })
  }

  async createOne(dto: CreatePostDto, author: User) {
    let post = this.postRepository.create({ ...dto, author });
    let lines = [];
    dto.LinesPostDto.forEach(element => {
      lines.push(new LineaPost(element.description,element.cantidad))
    });
    post.lines = lines;
    return await this.postRepository.save(post);
  }

  async editOne(id: number, dto: EditPostDto, author?: User) {
    const post = await this.getById(id, author);
    const editedPost = Object.assign(post, dto);
    return await this.postRepository.save(editedPost);
  }

  async deleteOne(id: number, author?: User) {
    const post = await this.getById(id, author);
    return await this.postRepository.remove(post);
  }

   
}

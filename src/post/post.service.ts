import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Post } from './entities';
import { CreatePostDto, EditPostDto } from './dtos';
import { User } from 'src/user/entities';
import { ImagePost } from './entities/images-post.entity';
import { TypePost } from './entities/type-post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(TypePost)
    private readonly typePostRepository: Repository<TypePost>,
    
  ) {}

  async getMany() {
    return await this.postRepository.find();
  }

  async getById(id: number, author?: User) {
    const post = await this.postRepository
      .findOne(id)
      .then(p => (!author ? p : !!p && author.id === p.author.id ? p : null));
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
    let category = await this.categoryRepository.findOne(dto.category_id);
    let type = await this.typePostRepository.findOne(dto.type_id);
    let post = this.postRepository.create({ ...dto, author });
    post.category = category;
    post.type = type;
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

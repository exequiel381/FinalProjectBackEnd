import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Post } from './entities';
import { CreatePostDto, EditPostDto } from './dtos';
import { User } from 'src/user/entities';
import { LineaPost } from './entities/lineaPost.entity';
const _ = require('lodash');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(LineaPost)
    private readonly linePostRepository: Repository<LineaPost>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    
  ) {}

  async getMany() {
    let posts = await this.postRepository.find();
    return _.orderBy(posts,"createdAt");
  }

  async getManyCategories() {
    return await this.categoryRepository.find();
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
      let obj = JSON.parse(element+"");//Convertir el json en js , esto pasa por mandar con formData un objeto desde el front
      lines.push(new LineaPost(obj.description,obj.cantidad,obj.categoryNumber))
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

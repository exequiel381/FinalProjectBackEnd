import { Reaction } from 'src/reaction/entities';
import { LineReaction } from 'src/reaction/entities/lineReaction.entity';
import { User } from 'src/user/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
import { Category } from './category.entity';
import { ImagePost } from './images-post.entity';
import { LineaPost } from './lineaPost.entity';
import { TypePost } from './type-post.entity';
import { NotFoundException } from '@nestjs/common';
  
  @Entity('posts')
  export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    title!: string;
  
    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'bool', default: true })
    status: boolean;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  

    @ManyToOne(()=>TypePost, (typePost) => typePost.posts)//Muchos post , a un typo
    @JoinColumn({name:'type_id'})
    type? : TypePost;

    @ManyToOne(()=>Category, (category) => category.posts)//Muchos post , a un typo
    @JoinColumn({name:'category_id'})
    category? : TypePost;

    @OneToMany(()=>ImagePost,(imagePost) => imagePost.post,{
      cascade:true,
      eager:true
    })
    images : ImagePost[]

    @OneToMany(()=>LineaPost,(lineaPost) => lineaPost.post,{
      cascade:true,
    })
    lines : LineaPost[]

    @OneToMany(() => Reaction, (reaction) => reaction.post,{ eager: false })
    reactions : Reaction[]

    @ManyToOne(
     () => User,
      user => user.posts,
      { eager: true },
    )
    @JoinColumn({ name: 'author' })
    author: User;

    public createReactionLine(idLinePost : number,requestQuantity : number) : LineReaction{
      let LinePost = this.lines.find(l => l.id === idLinePost);
      if(LinePost === null ) throw new NotFoundException('Una de las lineas indicadas no pertenece al post');
      if(LinePost.cantidad < requestQuantity) throw new NotFoundException('No puedes solicitar u ofrecer mas productos de lo publicado');
      return new LineReaction(LinePost,requestQuantity);
    } 
  }
  
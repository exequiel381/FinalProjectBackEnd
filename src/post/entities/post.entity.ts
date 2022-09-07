import { Reaction } from 'src/reaction/entities';
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
import { TypePost } from './type-post.entity';
  
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
    })
    images : ImagePost[]

    @OneToMany(() => Reaction, (reaction) => reaction.post,{ eager: true })
    reactions : Reaction[]

    @ManyToOne(
     () => User,
      user => user.posts,
      { eager: true },
    )
    @JoinColumn({ name: 'author' })
    author: User;
  }
  
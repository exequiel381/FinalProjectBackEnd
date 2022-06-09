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
import { ImagePost } from './images-post.etity';
import { TypePost } from './type-post.entity';
//   import { User } from 'src/user/entities';
  
  @Entity('posts')
  export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false })
    slug!: string;
  
    @Column({ type: 'varchar', length: 150 })
    title!: string;
  
    @Column({ type: 'text' })
    content!: string;
  
    // @Column({ type: 'varchar', length: 100, nullable: true })
    // category: string;
  
    @Column({ type: 'bool', default: true })
    status: boolean;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
  
    //relacion a muchas images
  

    @ManyToOne(()=>TypePost, (typePost) => typePost.posts)//Muchos post , a un typo
    @JoinColumn({name:'type_id'})
    type : TypePost;

    @ManyToOne(()=>Category, (category) => category.posts)//Muchos post , a un typo
    @JoinColumn({name:'category_id'})
    category : TypePost;

    @OneToMany(()=>ImagePost,(imagePost) => imagePost.post)
    images : ImagePost[]

    @ManyToOne(
     () => User,
      user => user.posts,
      { eager: true },
    )
    @JoinColumn({ name: 'author' })
    author: User;
  }
  
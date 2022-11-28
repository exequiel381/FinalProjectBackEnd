import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';
import { Post } from './post.entity';
//   import { User } from '../user/entities';
  
  @Entity('imagePost')
  export class ImagePost {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;

    @Column({ type: 'longtext'})
    base!: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(()=>Post, (post) => post.images,{
      onDelete: "CASCADE",
    })
    @JoinColumn({name:'post_id'})
    post : Post
  }
  
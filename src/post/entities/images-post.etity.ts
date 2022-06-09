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
//   import { User } from 'src/user/entities';
  
  @Entity('imagePost')
  export class ImagePost {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;
  
    @ManyToOne(()=>Post, (post) => post.images)
    @JoinColumn({name:'post_id'})
    post : Post

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    //Relacion a muchos post
  }
  
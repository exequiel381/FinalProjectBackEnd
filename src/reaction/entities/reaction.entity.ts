import { Post } from 'src/post/entities';
import { User } from 'src/user/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';
//   import { User } from 'src/user/entities';
  
  @Entity('reaction')
  export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.reactions)
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Post, (post) => post.reactions)
    @JoinColumn({name:'post_id'})
    post: Post
    
  }
  

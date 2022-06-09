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
  
    //Relacion a tabla category
    //relacion a muchas images
    //relacion a types

    @ManyToOne(
     () => User,
      user => user.posts,
      { eager: true },
    )
    @JoinColumn({ name: 'author' })
    author: User;
  }
  
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
import { LineaPost } from './lineaPost.entity';

  
  @Entity('category')
  export class Category {

    constructor(idCategory:number) {
      this.id = idCategory;
    }

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @OneToMany(() => LineaPost, (lineaPost) => lineaPost.category)//Un pais a muchas provincias
    lineasPosts : LineaPost[];
  }
  
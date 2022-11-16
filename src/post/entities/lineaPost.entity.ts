import { Exclude } from 'class-transformer';
import { LineReaction } from 'src/reaction/entities/lineReaction.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Category } from './category.entity';
import { Post } from './post.entity';
  
  @Entity('lineaPost')
  export class LineaPost {

    constructor(description : string,cantidad : number,idCategory:number) {
      this.descripcion = description;
      this.cantidad = cantidad;
      this.category = new Category(idCategory);
    }

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    descripcion!: string;

    @Column({ type: 'int' })
    cantidad!: number;
  
    @Exclude()
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @Exclude()
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @ManyToOne(()=>Post, (post) => post.lines,{
      onDelete: "CASCADE",
    })
    @JoinColumn({name:'post_id'})
    post : Post

    @ManyToOne(()=>Category, (category) => category.lineasPosts,{
      onDelete: "CASCADE",
    })
    @JoinColumn({name:'category_id'})
    category : Category
    
    @OneToMany(() => LineReaction, (lineaReaccion) => lineaReaccion.lineaPost)
    lineasReaccion : LineReaction[]
  }
  
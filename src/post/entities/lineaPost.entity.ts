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
    OneToOne
  } from 'typeorm';
import { Post } from './post.entity';
//   import { User } from 'src/user/entities';
  
  @Entity('lineaPost')
  export class LineaPost {

    constructor(description : string,cantidad : number) {
      this.descripcion = description;
      this.cantidad = cantidad;
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
    
    @OneToMany(() => LineReaction, (lineaReaccion) => lineaReaccion.lineaPost)
    lineasReaccion : LineReaction[]
  }
  
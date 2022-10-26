import { IsEnum } from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { Post } from 'src/post/entities';
import { User } from 'src/user/entities';
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
import { Certificate } from './certificate.entity';
import { LineReaction } from './lineReaction.entity';
//   import { User } from 'src/user/entities';

export enum ReactionStates {
  ACEPTED = 'ACEPTADO',
  REJECTED = 'RECHAZADO',
  CREATED = 'CREADO'
}

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
  
    @ManyToOne(() => User, (user) => user.reactions, {eager:true})
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Post, (post) => post.reactions)
    @JoinColumn({name:'post_id'})
    post: Post
    
    @OneToMany(()=>LineReaction,(lineaReaccion) => lineaReaccion.reaction,{
      cascade:true,
    })
    lines : LineReaction[]

    @OneToOne(() => Certificate, (certificate) => certificate.LineReaction)
    certificate : Certificate

    
    // @IsEnum(ReactionStates, {
    //   each: true,
    //   message: `El estado debe ser un Enum, ${EnumToString(ReactionStates)}`,
    // })
    // state: string;
  }
  

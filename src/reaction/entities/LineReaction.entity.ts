import { LineaPost } from 'src/post/entities/lineaPost.entity';
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
import { Reaction } from './reaction.entity';
//   import { User } from 'src/user/entities';
  
  @Entity('lineaReaccion')
  export class LineReaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    cantidad!: number;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @ManyToOne(()=>Reaction, (reaction) => reaction.lines)
    @JoinColumn({name:'reaction_id'})
    reaction : Reaction
    
    @OneToOne(()=> LineaPost)
    @JoinColumn({name: 'LineaPost_id'})
    lineaPost : LineaPost
  }
  
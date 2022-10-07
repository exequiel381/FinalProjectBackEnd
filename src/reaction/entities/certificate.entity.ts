import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
    
  } from 'typeorm';
import { LineReaction } from './lineReaction.entity';
  
  @Entity('certificate')
  export class Certificate {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'date', nullable: false })
    issue: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @OneToOne(()=> LineReaction)
    @JoinColumn({name: 'LineaReaction_id'})
    LineReaction : LineReaction
  }
  

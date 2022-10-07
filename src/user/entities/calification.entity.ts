import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    Entity,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { User } from './user.entity';

  
  @Entity('calification')
  export class Calification {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'commet', type: 'varchar', length: 255, default: '', nullable: true })
    comment: string;

    @Column({ name: 'calificate', type: 'int',nullable: false  })
    calificate: Number;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp',select: false })
    createdAt: Date;
  
    @ManyToOne(()=> User, (user) => user.myCalifications)
    @JoinColumn({name:'creatorUser_id'})
    creatorUser : User

    @ManyToOne(()=>User, (user) => user.aboutMeCalifications)
    @JoinColumn({name:'affectedUser_id'})
    calificatedUser : User
  }
  
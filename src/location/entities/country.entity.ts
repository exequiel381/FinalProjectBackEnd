import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    UpdateDateColumn
  } from 'typeorm';
import { Province } from './province.entity';
//   import { User } from '../user/entities';
  
  @Entity('country')
  export class Country {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Province, (province) => province.country)//Un pais a muchas provincias
    provinces : Province[];
 
  }
  
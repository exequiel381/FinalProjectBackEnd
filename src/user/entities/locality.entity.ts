import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';
import { Country } from './country.entity';
import { Province } from './province.entity';
//   import { User } from 'src/user/entities';
  
  @Entity('locality')
  export class Locality {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @ManyToOne(()=>Province, (province) => province.localities)
    @JoinColumn({name:'province_id'})
    province : Province;
    
  }
  
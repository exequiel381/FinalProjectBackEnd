import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
import { Country } from './country.entity';
import { Locality } from './locality.entity';
//   import { User } from 'src/user/entities';
  
  @Entity('province')
  export class Province {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name!: string;
  
    @Column({ type: 'varchar', length: 10 })
    ISO!: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  
    @ManyToOne(()=>Country, (country) => country.provinces)//Muchas provincias , a un pais
    @JoinColumn({name:'country_id'})
    country : Country;

    @OneToMany(() => Locality, (locality) => locality.province)
    localities : Locality[];
    
  }
  
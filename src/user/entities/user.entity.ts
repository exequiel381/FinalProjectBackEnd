import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    Entity,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { hash } from 'bcryptjs';
  import { Post } from 'src/post/entities';
import { Reaction } from 'src/reaction/entities';
import { Locality } from 'src/location/entities/locality.entity';
import { Calification } from './calification.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, default: '', nullable: true })
    name: string;
  
    @Column({ name: 'lastName', type: 'varchar', length: 255, default: '', nullable: true  })
    lastName: string;

    @Column({ name: 'dni', type: 'varchar', length: 20, default: '', nullable: true  })
    dni: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string;
  
    @Column({ type: 'varchar', length: 128, nullable: false, select: false })
    password: string;
  
    @Column({ type: 'simple-array' })
    roles: string[];
  
    @Column({ type: 'bool', default: true })
    status: boolean;
  
    // con select: false no me trae el atributo cuando lo busco para poder devolver sin tener que hacer DTO
    //Tambien puedo usar el decorador @Exclude(), para que solo no lo serializa cuando devuelve el dato
    // @Exclude()
    @CreateDateColumn({ name: 'created_at', type: 'timestamp',select: false })
    createdAt: Date;
  
    @OneToMany(() => Reaction, (reaction) => reaction.user)
    reactions : Reaction[]

    @OneToMany(() => Calification, (calification) => calification.creatorUser)
    myCalifications : Calification[]

    @OneToMany(() => Calification, (calification) => calification.calificatedUser)
    aboutMeCalifications : Calification[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (!this.password) {
        return;
      }
      this.password = await hash(this.password, 10);
    }
  
    @ManyToOne(()=>Locality,(locality) => locality.users,{
      eager:true,
    })
    @JoinColumn({name:'locality_id'})
    locality : Locality

     @OneToMany(
      _ => Post,
      post => post.author,
     { cascade: true },
     )
      posts: Post;
  }
  
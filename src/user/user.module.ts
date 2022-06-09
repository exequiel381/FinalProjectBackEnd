import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Country } from './entities/country.entity';
import { Province } from './entities/province.entity';
import { Locality } from './entities/locality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Country,Province,Locality])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

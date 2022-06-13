import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Locality } from './entities/locality.entity';
import { Province } from './entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country,Locality,Province])],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}

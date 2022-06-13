import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Locality } from './entities/locality.entity';
import { Province } from './entities/province.entity';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>,
        @InjectRepository(Locality)
        private readonly localityRepository: Repository<Locality>,
      ) {}


      async getCountries() {
        return await this.countryRepository.find();
      }
      async getProvinces() {
        return await this.provinceRepository.find();
      }
      async getLocations() {
        return await this.localityRepository.find();
      }

      async getCountryProvinces(countryId : number) {
        return await this.provinceRepository
        .createQueryBuilder("province")
        .where("province.country_id = :id",{id : countryId})
        .getMany();
      }

      async getProvinceLocalities(provinceId : number) {
        return await this.localityRepository
        .find({
          where :{
            province : provinceId,
          }
        })
      }

}

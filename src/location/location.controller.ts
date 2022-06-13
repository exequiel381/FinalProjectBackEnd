import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('Location routes')
@Controller('location')
export class LocationController {
    constructor(
        private readonly locationService: LocationService,
      ) {}

    @Get('countries/list')
    async getCountries() {
      const data = await this.locationService.getCountries();
      return { data };
    }

    @Get('provinces/list')
    async getProvinces() {
      const data = await this.locationService.getProvinces();
      return { data };
    }

    @Get('provinces/:countryId')
    async getCountryProvinces(@Param('countryId', ParseIntPipe) countryId: number) {
      const data = await this.locationService.getCountryProvinces(countryId);
      return { data };
    }

    @Get('localities/list')
    async getLocations() {
      const data = await this.locationService.getLocations();
      return { data };
    }

    @Get('localities/:provinceId')
    async getProvinceLocalities(@Param('provinceId', ParseIntPipe) provinceId: number) {
      const data = await this.locationService.getProvinceLocalities(provinceId);
      return { data };
    }

}

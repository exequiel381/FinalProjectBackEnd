import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Country, Locality, Province } from 'src/location/entities';

const setLocation = async (config: ConfigService) => {
  const countryRepository = getRepository<Country>(Country);
  const provinceRepository = getRepository<Province>(Province);
  const localityRepository = getRepository<Locality>(Locality);

  const countries = await countryRepository.find();
  const provinces = await provinceRepository.find();
  const localities = await localityRepository.find();
    
  if (countries.length === 0) {
    const country = countryRepository.create({
      name: "Argentina",
    });
    countries.push(country);
    await countryRepository.save(countries);
  }

  if (provinces.length === 0) {
    const Tucuman = provinceRepository.create({
      name: "Tucuman",
    });

    provinces.push(Tucuman);

    await provinceRepository.save(provinces);
  }

  if (localities.length === 0) {
    const capital = localityRepository.create({
      name: "San Miguel de Tucuman",
    });
    localities.push(capital);
    await localityRepository.save(localities);
  }
};

export default setLocation; 
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
   
  const country= countryRepository.create({
    name: "Argentina",
  });

  if (countries.length === 0) {
    countries.push(country);
    await countryRepository.save(countries);
  }

  const Tucuman = provinceRepository.create({
    id: 15,
    name: "Tucuman",
    ISO : "AR-T",
    country: country
  });
  if (provinces.length === 0) {
    provinces.push(Tucuman);
    await provinceRepository.save(provinces);
  }

  if (localities.length === 0) {
    const capital = localityRepository.create({
      id : 8870,
      name: "San Miguel de Tucuman",
      postalCode:4000,
      province : Tucuman
    });
    localities.push(capital);
    await localityRepository.save(localities);
  }
};

export default setLocation; 
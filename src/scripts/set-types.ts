import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypePost } from 'src/post/entities/type-post.entity';

const setTypes = async (config: ConfigService) => {
  const typesRepository = getRepository<TypePost>(TypePost);

  const types = await typesRepository.find();
    
  if (types.length === 0) {
    const Donacion = typesRepository.create({
      name: "Donacion",
    });

    const Peticion = typesRepository.create({
      name: "Peticion",
    });

    types.push(Donacion,Peticion);

    return await typesRepository.save(types);
  }
};

export default setTypes; 
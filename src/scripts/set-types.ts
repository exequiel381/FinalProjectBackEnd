import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypePost } from 'src/post/entities/type-post.entity';

const setTypes = async (config: ConfigService) => {
  const typesRepository = getRepository<TypePost>(TypePost);

  const types = await typesRepository.find();
    
  if (types.length === 0) {
    
  }
};

export default setTypes; 
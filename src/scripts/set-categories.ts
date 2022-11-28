import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Category } from '../post/entities';

const setCategories = async (config: ConfigService) => {
  const categoryRepository = getRepository<Category>(Category);

  const categories = await categoryRepository.find();
    
  if (categories.length === 0) {
    const Donacion = categoryRepository.create({
      name: "Alimentos",
    });

    const Peticion = categoryRepository.create({
      name: "Ropa",
    });

    categories.push(Donacion,Peticion);

    return await categoryRepository.save(categories);
  }
};

export default setCategories; 
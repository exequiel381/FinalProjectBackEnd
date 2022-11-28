import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Category, Post } from './entities';

//Si utilizamos mocks son pruebas mockeadas --ESTAS PRUEBAS SON PARA MOQUEAR
//Si no los utilizamos y probamos los metodos reales , son pruebas de integracion

describe('PostController', () => {
    let controller: PostController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [PostService]
        }).compile();
        controller = module.get<PostController>(PostController);
    })

    it('should be defined', () => {
      expect(new Post()).toBeDefined();
    });
  });
  
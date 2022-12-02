import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PostModule } from '../src/post/post.module';

describe('PostController (e2e)', () => {
  var localUrl = 'http://[::1]:3000';
  beforeAll(() => {
    //obtener Token
  });

  it('/ (GET)', () => {
    return request(localUrl)
      .get('/post')
      .expect(200)
      //.expect('Hello World!');
  });
});

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import { generateTypeormConfigFile, setDefaultUser } from './scripts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  initSwagger(app);
  setDefaultUser(config);
  generateTypeormConfigFile(config);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//esto no me permite recibir propiedades que no esten decoradas en nuestro dto.
    }),
  );

  await app.listen(process.env.PORT || 3000);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();

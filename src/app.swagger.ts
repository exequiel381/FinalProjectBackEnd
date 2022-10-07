import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API DonARG')
    .addBearerAuth()
    .setDescription(
      'Esta la API de DonARG para proyecto Final',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};

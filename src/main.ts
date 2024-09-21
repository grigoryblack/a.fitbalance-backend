import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

  app.enableCors({
    origin: ['http://localhost:5173', 'https://a-fitbalance-front.onrender.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
      .setTitle('a.fitbalance backend')
      .setDescription('API всех запросов')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 8080;
  await app.listen(port);

  console.log(`Server is running on ${clientOrigin.replace('localhost', '127.0.0.1')}:${port}`);
  console.log(`Swagger UI is available at ${clientOrigin.replace('localhost', '127.0.0.1')}:${port}/api`);
}

bootstrap();

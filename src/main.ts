import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,  
    new FastifyAdapter({ 
      logger: true
    }),
    {
      cors: true,
      bodyParser: true
    });
  app.setGlobalPrefix('/v1/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist:true, transform: true }));

  await app.listen(3000);
}
bootstrap();
  
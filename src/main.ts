import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'verbose', 'warn'],
    cors: true,
    bodyParser: true
  });
  app.setGlobalPrefix('/v1/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist:true, transform: true }));

  await app.listen(3000);
}
bootstrap();
 

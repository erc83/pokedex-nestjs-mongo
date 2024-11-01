import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({            // tiene muchas propiedades
      whitelist: true,              // deja pasar los valores de la data que se estan esperando
      forbidNonWhitelisted: true,   // envia un mensaje por cada valor agregado que no se necesita
    })
  )


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

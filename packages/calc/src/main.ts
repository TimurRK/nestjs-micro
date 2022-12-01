import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { IAppMicroserviceSettings } from '@shared/types';

import config from 'config';

import { AppModule } from './app.module';

const APP_SETTINGS = config.get<IAppMicroserviceSettings>('APP_SETTINGS');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: APP_SETTINGS.port,
      host: APP_SETTINGS.host,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen();
}

bootstrap();

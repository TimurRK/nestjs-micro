import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { IAppSettings } from '@shared/types';
import { cors_options_delegate } from '@shared/cors';

import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'config';

import { AppModule } from './app.module';

const APP_SETTINGS = config.get<IAppSettings>('APP_SETTINGS');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.use(json({ limit: APP_SETTINGS.body_limit }));
  app.use(
    urlencoded({
      limit: APP_SETTINGS.body_limit,
      extended: true,
      parameterLimit: APP_SETTINGS.body_parameter_limit,
    })
  );
  app.use(cookieParser());

  app.enableCors(cors_options_delegate);
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(APP_SETTINGS.port);
}

bootstrap();

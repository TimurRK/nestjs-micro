import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { LoggerModule } from '@shared/logger/logger.module';
import { LoggerMiddleware } from '@shared/logger/logger.middleware';
import { HealthzModule } from '@shared/healthz/healthz.module';
import { IMicroserviceSettings } from '@shared/types';

import config from 'config';

import { AppController } from './app.controller';

const CALC_MICROSERVICE_SETTINGS = config.get<IMicroserviceSettings>('CALC_MICROSERVICE_SETTINGS');

@Module({
  imports: [
    LoggerModule,
    HealthzModule,
    ClientsModule.register([
      {
        name: CALC_MICROSERVICE_SETTINGS.name,
        transport: Transport.TCP,
        options: {
          port: CALC_MICROSERVICE_SETTINGS.port,
          host: CALC_MICROSERVICE_SETTINGS.host,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LoggerModule } from '@shared/logger/logger.module';
import { LoggerMiddleware } from '@shared/logger/logger.middleware';

import { AppController } from './app.controller';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

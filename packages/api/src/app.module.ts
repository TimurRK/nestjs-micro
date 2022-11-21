import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LoggerModule } from '@shared/logger/logger.module';
import { LoggerMiddleware } from '@shared/logger/logger.middleware';
import { HealthzModule } from '@shared/healthz/healthz.module';

@Module({
  imports: [LoggerModule, HealthzModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

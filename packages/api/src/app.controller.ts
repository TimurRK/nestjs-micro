import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { IMicroserviceSettings } from '@shared/types';

import config from 'config';

const CALC_MICROSERVICE_SETTINGS = config.get<IMicroserviceSettings>('CALC_MICROSERVICE_SETTINGS');

@Controller()
export class AppController {
  constructor(@Inject(CALC_MICROSERVICE_SETTINGS.name) private client: ClientProxy) {}

  @Get('calc')
  public accumulate() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];

    return this.client.send<number>(pattern, payload);
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'sum' })
  public async accumulate(data: number[]) {
    return (data || []).reduce((a, b) => a + b);
  }
}

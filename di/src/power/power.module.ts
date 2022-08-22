import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  // the exports allow us to make the PowerService available to other modules
  // Will use the PowerService in the cpu & disk modules
  exports: [PowerService],
})
export class PowerModule {}

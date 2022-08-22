import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  // importing here allows the cpu module to use the exported services
  // from the PowerModule
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}

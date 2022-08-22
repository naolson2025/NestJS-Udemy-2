import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],
  providers: [DiskService],
})
export class DiskModule {}

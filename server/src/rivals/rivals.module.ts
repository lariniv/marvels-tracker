import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RivalsService } from './rivals.service.js';

@Module({
  imports: [ConfigModule],
  providers: [RivalsService],
})
export class RivalsModule {}

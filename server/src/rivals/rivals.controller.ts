import { Controller, Get, Query } from '@nestjs/common';
import { RivalsService } from './rivals.service.js';

@Controller('/rivals')
export class RivalsController {
  constructor(private rivalsService: RivalsService) {}

  @Get('/player')
  async getPlayerIdByName(@Query('name') name: string): Promise<string> {
    return this.rivalsService.getPlayerIdByName(name);
  }
}

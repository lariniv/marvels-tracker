import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RivalsService } from './rivals.service.js';
import RivalsApiConfig from '../config/rivals-api.config.js';
import axios from 'axios';
import rivalsApiConfig from '../config/rivals-api.config.js';
import { RivalsController } from './rivals.controller.js';
import { RIVALS_API_INSTANCE } from './rivals.constatnts.js';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RIVALS_API_INSTANCE,
      useFactory: (config: ConfigType<typeof RivalsApiConfig>) => {
        const xApiKey = config.rivals_key;

        if (!xApiKey) {
          throw new Error('Not sure yet');
        }

        return axios.create({
          baseURL: 'https://marvelrivalsapi.com/api',
          headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json',
          },
        });
      },
      inject: [rivalsApiConfig.KEY],
    },
    RivalsService,
  ],
  exports: [RIVALS_API_INSTANCE],
  controllers: [RivalsController],
})
export class RivalsModule {}

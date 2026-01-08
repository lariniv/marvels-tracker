import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RivalsService } from './rivals.service.js';
import RivalsApiConfig from '../config/rivals-api.config.js';
import axios from 'axios';
import rivalsApiConfig from '../config/rivals-api.config.js';
import { RivalsController } from './rivals.controller.js';
import { RIVALS_API_INSTANCE } from './rivals.constatnts.js';
import axiosRetry from 'axios-retry';

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

        const rivalsApi = axios.create({
          baseURL: 'https://marvelrivalsapi.com/api',
          headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json',
          },
        });

        axiosRetry(rivalsApi, {
          retries: 3,
          retryDelay: (retryCount, error) => {
            const resetHeader = error.response?.headers[
              'x-ratelimit-reset'
            ] as string;
            const waitTime = resetHeader
              ? parseInt(resetHeader) * 1000 - Date.now() + 2000
              : 60000 * (retryCount || 1);

            return Math.max(waitTime, 1000);
          },
          retryCondition: (error) => error.response?.status === 429,
        });

        return rivalsApi;
      },
      inject: [rivalsApiConfig.KEY],
    },
    RivalsService,
  ],
  exports: [RIVALS_API_INSTANCE],
  controllers: [RivalsController],
})
export class RivalsModule {}

import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import rivalsApiConfig from '../config/rivals-api.config';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { RivalsPlayerByName } from './types/rivals-player.type';

@Injectable()
export class RivalsService {
  constructor(
    @Inject(rivalsApiConfig.KEY)
    private readonly rivalsConfig: ConfigType<typeof rivalsApiConfig>,
    private readonly rivalsInstance: AxiosInstance,
  ) {
    const xApiKey = this.rivalsConfig.rivals_key;

    if (!xApiKey) {
      throw new Error('Not sure yet');
    }

    this.rivalsInstance = axios.create({
      baseURL: 'https://marvelrivalsapi.com/api',
      headers: {
        'x-api-key': xApiKey,
      },
    });
  }

  private async getPlayerIdByName(name: string): Promise<string> {
    const player: RivalsPlayerByName = await this.rivalsInstance.get(
      `/v1/${name}`,
    );

    if (!player) {
      throw new Error('404');
    }

    return player.uid;
  }
}

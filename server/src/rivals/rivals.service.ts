import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { RivalsPlayerByName } from './types/rivals-player.type.ts';
import { RIVALS_API_INSTANCE } from './rivals.constatnts.js';
import { RivalsErrorResponse } from './types/rivals-error.type.js';

@Injectable()
export class RivalsService {
  constructor(
    @Inject(RIVALS_API_INSTANCE)
    private readonly rivalsApi: AxiosInstance,
  ) {}

  async getPlayerIdByName(name: string): Promise<string> {
    try {
      const player: AxiosResponse<RivalsPlayerByName> =
        await this.rivalsApi.get(`/v1/find-player/${name}`);

      return player.data.uid;
    } catch (err) {
      if (axios.isAxiosError<RivalsErrorResponse>(err)) {
        if (
          err.response?.status === 400 &&
          err.response?.data?.message === 'Player not found'
        ) {
          throw new NotFoundException();
        }
      }

      throw err;
    }
  }
}

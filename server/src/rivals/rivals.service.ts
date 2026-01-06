import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { RivalsPlayerByName } from './types/rivals-player.type.ts';
import { RIVALS_API_INSTANCE } from './rivals.constatnts.js';
import { RivalsErrorResponse } from './types/rivals-error.type.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RivalsHero } from './types/rivals-hero.type.js';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RivalsService {
  constructor(
    @Inject(RIVALS_API_INSTANCE)
    private readonly rivalsApi: AxiosInstance,
    private readonly prismaService: PrismaService,
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

  @Cron('0 0 0 * * 5') // Every week on Friday
  private async getRivalsHeroesList() {
    const heroes: AxiosResponse<RivalsHero[]> =
      await this.rivalsApi.get(`/v1/heroes`);

    if (!heroes) {
      throw new NotFoundException();
    }

    const roleMap: Record<string, string> = {
      Duelist: 'Duelist',
      Strategist: 'Strategist',
      Vanguard: 'Vanguard',
    };

    const attackTypeMap: Record<string, string> = {
      'Melee Heroes': 'MeleeHeroes',
      'Projectile Heroes': 'ProjectileHeroes',
      Projectile: 'ProjectileHeroes',
      'Hitscan Heroes': 'HitscanHeroes',
    };

    const heroesData = heroes.data.map(
      ({ id, name, real_name, imageUrl, difficulty, role, attack_type }) => ({
        id,
        name,
        real_name,
        imageUrl,
        difficulty: Number(difficulty),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        role: roleMap[role] as any,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        attack_type: attackTypeMap[attack_type] as any,
      }),
    );

    return this.prismaService.rivalsHero.createMany({
      data: heroesData,
      skipDuplicates: true,
    });
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { RIVALS_API_INSTANCE } from './rivals.constatnts.js';
import { RivalsErrorResponse } from './types/rivals-axios.type.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RivalsHero } from './types/rivals-hero.type.js';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import { CreateRivalsHeroDto } from './dto/create-rivals-hero.dto.js';
import { CreateRivalsHeroStatsDto } from './dto/create-rivals-hero-stats.dto.js';
import { RivalsPlayerByName } from './types/rivals-player.type.js';

@Injectable()
export class RivalsService {
  constructor(
    @Inject(RIVALS_API_INSTANCE)
    private readonly rivalsApi: AxiosInstance,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly logger = new Logger(RivalsService.name);

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

  @Cron(CronExpression.EVERY_WEEK)
  private async processRivalsHeroesList() {
    const heroes: AxiosResponse<RivalsHero[]> =
      await this.rivalsApi.get(`/v1/heroes`);

    if (!heroes) {
      throw new NotFoundException();
    }

    const heroesData = plainToInstance(CreateRivalsHeroDto, heroes.data, {
      excludeExtraneousValues: true,
    });

    return this.prismaService.rivalsHero.createMany({
      data: heroesData,
      skipDuplicates: true,
    });
  }

  private sleep(duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  private async syncRivalsHeroStats({ heroId }: { heroId: string }) {
    try {
      this.logger.log(`Processing hero: ${heroId}`);

      const heroStats = await this.rivalsApi.get(
        `/v1/heroes/hero/${heroId}/stats`,
      );

      if (!heroStats?.data) {
        this.logger.warn(`Empty data for hero ${heroId}`);
      }

      const heroStatData = plainToInstance(
        CreateRivalsHeroStatsDto,
        heroStats.data,
        { excludeExtraneousValues: true },
      );

      await this.prismaService.rivalsHeroStats.upsert({
        where: { hero_id: heroStatData.hero_id },
        create: heroStatData,
        update: heroStatData,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async processRivalsHeroesStats() {
    const heroIds = await this.prismaService.rivalsHero.findMany({
      where: {},
      select: { id: true },
    });

    this.logger.debug(`Found ${heroIds.length} heroes to process.`);

    for (const { id: heroId } of heroIds) {
      await this.syncRivalsHeroStats({ heroId });
    }
  }
}

import { Expose, Transform } from 'class-transformer';
import {
  RivalsAttackType,
  RivalsClasses,
} from '../../generated/prisma/enums.js';

const ROLE_MAP: Record<string, string> = {
  Duelist: 'Duelist',
  Strategist: 'Strategist',
  Vanguard: 'Vanguard',
};

const ATTACK_TYPE_MAP: Record<string, string> = {
  'Melee Heroes': 'MeleeHeroes',
  'Projectile Heroes': 'ProjectileHeroes',
  Projectile: 'ProjectileHeroes',
  'Hitscan Heroes': 'HitscanHeroes',
};

export class CreateRivalsHeroDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  real_name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  difficulty: number;

  @Expose()
  @Transform(({ value }: { value: string }) => ROLE_MAP[value])
  role: RivalsClasses;

  @Expose()
  @Transform(({ value }: { value: string }) => ATTACK_TYPE_MAP[value])
  attack_type: RivalsAttackType;
}

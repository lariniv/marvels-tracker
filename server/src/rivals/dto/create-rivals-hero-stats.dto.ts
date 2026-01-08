import { Expose, Transform } from 'class-transformer';

export class CreateRivalsHeroStatsDto {
  @Expose()
  @Transform(({ value }) => String(value))
  hero_id: string;

  @Expose()
  matches: number;

  @Expose()
  wins: number;

  @Expose()
  k: number;

  @Expose()
  d: number;

  @Expose()
  a: number;

  @Expose()
  play_time: string;

  @Expose()
  total_hero_damage: number;

  @Expose()
  total_hero_heal: number;

  @Expose()
  total_damage_taken: number;

  @Expose()
  session_hit_rate: number;

  @Expose({ name: 'solo_kill' })
  solo_kill_number: number;
}

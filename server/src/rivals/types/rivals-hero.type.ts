import {
  RivalsAttackType,
  RivalsClasses,
} from '../../generated/prisma/enums.js';

export interface RivalsHeroPlayerStats {
  hero_id: number;
  hero_name: string;
  hero_class: RivalsClasses;
  hero_thumbnail: string;
  matches: number;
  wins: number;
  win_rate: number;
}

export interface RivalsPlayerHeroRanked {
  hero_id: number;
  hero_name: string;
  hero_thumbnail: string;
  matches: number;
  wins: number;
  mvp: number;
  svp: number;
  kills: number;
  deaths: number;
  assists: number;
  play_time: number;
  damage: number;
  heal: number;
  damage_taken: number;
  main_attack: {
    total: number;
    hits: number;
  };
}

export interface RivalsHero {
  id: string;
  name: string;
  real_name: string;
  imageUrl: string;
  difficulty: number;
  role: RivalsClasses;
  attack_type: RivalsAttackType;
}

export interface RivalsHeroStats {
  hero_id: number;
  hero_name: string;
  hero_icon: string;
  matches: number;
  wins: number;
  k: number;
  d: number;
  a: number;
  play_time: string;
  total_hero_damage: number;
  total_hero_heal: number;
  total_damage_taken: number;
  session_hit_rate: number;
  solo_kill: number;
}

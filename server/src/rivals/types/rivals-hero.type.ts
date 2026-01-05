type RivalsClasses = 'Strategist' | 'Vanguard' | 'Duelist';
type RivalsAttackType = 'Melee Heroes' | 'Hitscan Heroes' | 'Projectile Heroes';

export interface RivalsHeroPlayerStats {
  hero_id: number;
  hero_name: string; // Maybe implement hero names?
  hero_class: RivalsClasses;
  hero_thumbnail: string;
  matches: number;
  wins: number;
  win_rate: number;
}

export interface RivalsHeroRanked {
  hero_id: number;
  hero_name: string; // Maybe implement hero names?
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
  role: RivalsClasses;
  attack_type: RivalsAttackType;
}

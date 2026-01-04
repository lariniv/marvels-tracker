import { RivalsHeroPlayerStats, RivalsHeroRanked } from './rivals-hero.type.js';

export interface RivalsPlayerByName {
  uid: string;
  name: string;
}

interface RivalsMatch {
  match_uid: string;
  map_id: number;
  map_thumbnail: string;
  duration: number;
  season: number;
  winner_side: number;
  mvp_uid: number;
  svp_uid: number;
  match_time_stamp: number;
  play_mode_id: number;
  game_mode_id: number;
  score_info: {
    '0': number;
    '1': number;
  };
  player_performance: {
    player_uid: number;
    hero_id: number;
    hero_name: string;
    hero_type: string;
    kills: number;
    deaths: number;
    assists: number;
    is_win: {
      score: number;
      is_win: boolean;
    };
    disconnected: boolean;
    camp: number;
    score_change: number;
    level: number;
    new_level: number;
    new_score: number;
  };
}

interface RivalsRankChange {
  match_time_stamp: number;
  level_progression: {
    from: number;
    to: number;
  };
  score_progression: {
    add_score: number;
    total_score: number;
  };
}

interface RivalsTeamMate {
  player_info: {
    nick_name: string;
    player_icon: string;
    player_uid: number;
  };
  matches: number;
  wins: number;
  win_rate: string;
}

interface RivalsMap {
  map_id: number;
  map_thumbnail: string;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  play_time: number;
}

export interface RivalsPlayerById {
  uid: string;
  name: string;
  player: {
    uid: string;
    level: string;
    name: string;
    icon: {
      player_icon_id: string;
      player_icon: string;
    };
    rank: {
      rank: string;
      image: string;
      color: string;
    };
    info: {
      completed_achivements: string;
      login_os: 'PC';
      //more info
    };
    isPrivate: boolean;
    overall_stats: {
      total_matches: number;
      total_wins: number;
      unranked: {
        total_matches: number;
        total_wins: number;
        total_assists: number;
        total_deaths: number;
        total_kills: number;
        total_time_played: string;
        total_time_played_raw: number;
        total_mvp: number;
        total_svp: number;
      };
      ranked: {
        total_matches: number;
        total_wins: number;
        total_assists: number;
        total_deaths: number;
        total_kills: number;
        total_time_played: string;
        total_time_played_raw: number;
        total_mvp: number;
        total_svp: number;
      };
    };
    match_history: Array<RivalsMatch>;
    rank_history: Array<RivalsRankChange>;
    hero_matchups: Array<RivalsHeroPlayerStats>;
    team_mates: Array<RivalsTeamMate>;
    heroes_ranked: Array<RivalsHeroRanked>;
    maps: Array<RivalsMap>;
  };
}

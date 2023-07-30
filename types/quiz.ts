interface QuizConfig {
  multiple_channels: boolean;
  customGames?: boolean;
  channels_category: string;
  private: boolean;
  viewChannel: string[];
  category_name: string;
  gameStart: number;
  roles: Roles[];
}

interface Roles {
  id: string;
  gamesPerUser?: number;
  playQzgame?: boolean;
}

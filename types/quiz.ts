interface MultipleChannels {
  enable: boolean;
  category_id?: string;
  category_name?: string;
  private: {
    enable: boolean;
    viewChannel: string[];
  };
}

interface QuizConfig {
  multiple_channels: MultipleChannels;
  customGames?: boolean;
  gameStart: number;
  roles: Roles[];
}

interface Roles {
  id: string;
  gamesPerUser?: number;
  playQzgame?: boolean;
}

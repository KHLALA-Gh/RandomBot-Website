type answer = "A" | "B" | "C" | "D" | "N";
type AnswerBody = {
  index: number;
  answer: answer;
};
interface QuizGamePlayer extends Member {
  answers?: AnswerBody[];
  score?: number;
  ready?: boolean;
}

interface QzGame {
  players: QuizGamePlayer[];
  index: number;
  maxPlayers: number;
  announcementId: string;
  started?: boolean;
  end?: boolean;
  category: string;
  amount: number;
  time?: number;
  hostUserId: string;
  mainChannel?: boolean;
  gameStart?: number;
  guildId: string;
  difficulty?: string;
  bannedPlayers: string[];
  invitedMembers: string[];
  hostId: string;
}

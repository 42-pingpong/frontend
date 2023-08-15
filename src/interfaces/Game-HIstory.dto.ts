export interface GameInfo {
  score: number;
  user: {
    id: number;
    profile: string;
    nickName: string;
  };
}
export interface GameHistoryDto {
  gameId: number;
  createDate: string;
  gameMap: string;
  gameScores: GameInfo[];
}

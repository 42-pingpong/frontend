export interface ChatDTO {
  roomId: string;
  id?: number;
  nickName: string;
  text: string;
}

export interface ChatRoomDTO {
  chatName: string;
  levelOfPublicity: string;
  curParticipants: number;
  maxParticipants: number;
  groupChatId: number;
  password?: string;
}

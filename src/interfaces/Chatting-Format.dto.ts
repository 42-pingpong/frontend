export interface ChatDTO {
  roomId: string;
  id?: number;
  nickName: string;
  text: string;
}

// export interface ChatRoomDTO {
//   id: number;
//   title: string;
//   people: number;
//   maxPeople: number;
//   permission: string;
// }

export interface ChatRoomDTO {
  log?: ChatDTO[];
  chatName: string;
  password?: string;
  levelOfPublicity: string;
  currentParticipants: number;
  maxParticipants: number;
  ownerId?: number;
  roomId?: number;
}

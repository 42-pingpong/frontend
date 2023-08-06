export interface IChat {
  id?: number;
  nickName: string;
  text: string;
}

// export interface IChatRoom {
//   id: number;
//   title: string;
//   people: number;
//   maxPeople: number;
//   permission: string;
// }

export interface IChatRoom {
  log?: IChat[];
  chatName: string;
  password?: string;
  levelOfPublicity: string;
  currentParticipants: number;
  maxParticipants: number;
  ownerId?: number;
  roomId: number;
}

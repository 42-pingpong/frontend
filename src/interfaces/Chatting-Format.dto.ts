import { UserDto } from './User.dto';

/*
 * GroupChatting
 */
export interface RequestGroupChatDTO {
  message: string;
  senderId: number;
  receivedGroupChatId: number;
}

export interface ResponseGroupChatDTO {
  groupChatMessageId: number;
  receivedGroupChatId: number;
  messageInfo: MessageInfoDTO;
}

export interface fetchRequestGroupChatDTO {
  groupChatId: number;
  userId: number;
}

/*
 * DirectChatting
 */
export interface RequestDirectMessageDTO {
  message: string;
  senderId: number;
  receiverId: number;
}

export interface ResponseDirectMessageDTO {
  directMessageId: number;
  receivedUserId: number;
  receivedUser: UserDto;
  messageInfo: MessageInfoDTO;
}

export interface fetchRequestDirectMessageDTO {
  userId: number;
  targetId: number;
}

/*
 * Common
 */
interface MessageInfoDTO {
  messageId: number;
  message: string;
  createdAt: string;
  sender: senderDTO;
}

interface senderDTO {
  id: number;
  nickname: string;
  profile: string;
}

export interface ChatRoomDTO {
  chatName: string;
  levelOfPublicity: string;
  curParticipants: number;
  maxParticipants: number;
  groupChatId: number;
  password?: string;
}

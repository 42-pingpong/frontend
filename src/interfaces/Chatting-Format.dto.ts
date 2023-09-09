import { UserDto } from './User.dto';

/**
 * ChatRoom
 */
export interface ChatRoomDTO {
  chatName: string;
  levelOfPublicity: string;
  curParticipants: number;
  maxParticipants: number;
  groupChatId: number;
  password?: string;
}

export interface ChatRoomInfoDTO {
  chatName: string;
  levelOfPublicity: string;
  curParticipants: number;
  maxParticipants: number;
  groupChatId: number;
  password?: string;
  owner: senderDTO;
  ownerId: number;
  admin: senderDTO[];
  mutedUsers: MutedUserDto[];
  bannedUsers: senderDTO[];
  joinedUser: senderDTO[];
}

export interface MutedUserDto {
  id: number;
  muteDue: Date;
  mutedGroupId: number;
  mutedUser: senderDTO;
  mutedUserId: number;
}

export interface JoinGroupChatDTO {
  groupChatId: number;
  userId: number;
  password?: string;
}

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

/***
 * GroupChatting Function
 */
export interface ResponseFuncDto {
  groupChatId: number;
  userId: number;
}

export interface ResponseMuteDto {
  groupChatId: number;
  userId: number;
  chatSocketId: number;
  muteFor: number;
}

export interface RequestKickDto {
  groupChatId: number;
  kickUserId: number;
  requestUserId: number;
}

export interface RequestBlockDto {
  userId: number;
  blockedUserId: number;
}

export interface RequestBanDto {
  groupChatId: number;
  userId: number;
  bannedId: number;
}

export interface RequestMuteDto {
  groupChatId: number;
  userId: number;
  requestUserId: number;
  time: number;
  unit: string;
}

export interface RequestGoPingPongDto {
  groupChatId: number;
  userId: number;
  userNickName: string;
  targetUserId: number;
  targetUserNickName: string;
}

export interface ResponseGoPingPongDto {
  groupChatId: number;
  userId: number;
  userNickName: string;
  targetUserId: number;
  targetUserNickName: string;
}

export interface goPingPongDto {
  groupChatId: number;
  userId: number;
  targetUserId: number;
}

export interface playerInfoDto {
  id: number;
  is_host: boolean;
  play_number: number;
  enemy_id: number;
}

export interface RequestUnbanDto {
  groupChatId: number;
  userId: number;
  bannedId: number;
}

export interface RequestUnmuteDto {
  groupChatId: number;
  userId: number;
  requestUserId: number;
}

export interface ResponseUnBanDto {
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

export interface senderDTO {
  id: number;
  nickName: string;
  profile: string;
}

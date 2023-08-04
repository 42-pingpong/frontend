export interface CreateRequestFriendDto {
  requestedUserId: number;
}

export interface CheckedAlarmDto {
  requestId: number;
}

export interface ResponseNotificationDto {
  requestId: number;
  requestingUser: {
    id: number;
    nickName: string;
  };
  requestType: string;
  isAccepted: string;
  createdAt: string;
  pastTime: string;
}

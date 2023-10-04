export interface UserDto {
  id: number;
  profile: string;
  nickName: string;
  level?: number;
  email?: string;
  status?: string;
  fullName?: string;
  selfIntroduction?: string;
  is2FAEnabled?: boolean;
  is2FAVerified?: boolean;
  TFAVerifyDueDate?: Date;
}

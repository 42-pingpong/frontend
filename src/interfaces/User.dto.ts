export interface UserDto {
  id: number;
  profile: string;
  nickName: string;
  level?: number;
  email?: string;
  status?: string;
  fullName?: string;
  selfIntroduction?: string;
  isEmailVerified?: boolean;
}

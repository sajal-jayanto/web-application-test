export type UserType = {
  id: number;
  userName: string;
  email: string;
  gender: string;
  age: number;
  followerCount: number;
  isActive: boolean;
};

export type MurmurType = {
  id: number;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  author: UserType;
};
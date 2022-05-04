export enum ACCOUNT_ERROR {
  NOT_CREATED = "NOT_CREATED",
}
export interface UserData {
  name: string;
  id: string;
}

export interface PostCardData {
  id: string;
  title: string;
  user: string;
  prepostId: string;
}

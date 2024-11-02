import { UserType } from "./UserType";

export type QuestionType = {
  id: number;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: UserType;
};

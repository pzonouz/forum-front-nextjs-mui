import { AnswerType } from "./AnswerTypes";
import { UserType } from "./UserType";

export type QuestionType = {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  solved: boolean;
  user: UserType;
  answers: AnswerType[];
};

export type QuestionSearchParams = {
  sort_by: string;
  sort_order: string;
  page: string;
  limit: string;
};

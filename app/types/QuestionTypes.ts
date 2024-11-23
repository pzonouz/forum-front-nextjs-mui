import { AnswerType } from "./AnswerTypes";
import { UserType } from "./UserType";

export type QuestionType = {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  solved: boolean;
  user: UserType;
  answers: AnswerType[];
};

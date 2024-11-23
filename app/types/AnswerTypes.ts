import { QuestionType } from "./QuestionTypes";
import { UserType } from "./UserType";

export type AnswerType = {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  question: QuestionType;
  solving: boolean;
};

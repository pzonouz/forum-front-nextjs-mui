import { QuestionType } from "./QuestionTypes";
import { UserType } from "./UserType";

export type AnswerType = {
  id: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: UserType;
  question: QuestionType;
  solving: boolean;
};

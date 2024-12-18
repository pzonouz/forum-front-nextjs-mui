import { CreateQuestion } from "./components/Question/CreateQuestion";
import { TopQuestions } from "./components/Question/TopQuestions";
import { QuestionSearchParams } from "./types/QuestionTypes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<QuestionSearchParams>;
}) {
  return (
    <>
      <CreateQuestion />
      <TopQuestions searchParams={await searchParams} />
    </>
  );
}

import { QuestionSearchParams } from "../types/QuestionTypes";
import { CreateQuestion } from "../components/Question/CreateQuestion";
import { TopQuestions } from "../components/Question/TopQuestions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<QuestionSearchParams>;
}) {
  return (
    <>
      <CreateQuestion />
      {/* <TopQuestions searchParams={await searchParams} /> */}
    </>
  );
}

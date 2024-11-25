import { AddQuestion } from "./components/Question/AddQuestion";
import { TopQuestions } from "./components/Question/TopQuestions";
import { QuestionSearchParams } from "./types/QuestionTypes";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<QuestionSearchParams>;
}) {
  return (
    <>
      <AddQuestion />
      <TopQuestions searchParams={await searchParams} />
    </>
  );
}

import { UpdateQuestion } from "@/app/components/Question/UpdateQuestion";
import { Unauthorized } from "@/app/components/Shared/Unauthoried";
import { QuestionType } from "@/app/types/QuestionTypes";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const resQuestion = await fetch(
    `${process.env.BACKEND_URL}/questions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session?.access}`,
        ContentType: "application/json",
      },
    },
  );
  const question: QuestionType = await resQuestion.json();
  if (question?.user?.email != session?.user?.email) {
    return <Unauthorized />;
  }
  return <UpdateQuestion question={question} />;
};

export default page;

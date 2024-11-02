import { EditQuestion } from "@/app/components/Question/EditQuestion";
import { Unauthorized } from "@/app/components/Shared/Unauthoried";
import { QuestionType } from "@/app/types/QuestionTypes";
import { auth } from "@/auth";

const page = async ({ params }: { params: { id: string } }) => {
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
  return <EditQuestion question={question} />;
};

export default page;

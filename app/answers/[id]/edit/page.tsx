import { UpdateAnswer } from "@/app/components/Answer/UpdateAnswer";
import { Unauthorized } from "@/app/components/Shared/Unauthoried";
import { AnswerType } from "@/app/types/AnswerTypes";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const resAnswer = await fetch(`${process.env.BACKEND_URL}/answers/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
      ContentType: "application/json",
    },
  });
  const answer: AnswerType = await resAnswer.json();
  if (answer?.user?.email != session?.user?.email) {
    return <Unauthorized />;
  }
  return <UpdateAnswer answer={answer} />;
};

export default page;

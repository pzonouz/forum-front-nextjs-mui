"use server";
import { QuestionType } from "@/app/types/QuestionTypes";
import { auth } from "@/auth";

async function POST(request: Request) {
  const formData = new FormData();
  const session = await auth();
  const body = await request.json();
  const question: QuestionType | null = body?.quesion;
  const resUpload = await fetch(
    `${process.env.BACKEND_URL}/uploads/${body.filename}`,
    {
      method: "DELETE",
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.access}`,
      },
    },
  );
  if (resUpload.ok) {
    if (question) {
      const resQuestions = await fetch(
        `${process.env.BACKEND_URL}/questions/${question?.id}`,
        {
          method: "EDIT",
          body: JSON.stringify(
            question?.filenames?.filter(
              (filename: string) => filename !== body.filename,
            ),
          ),
          headers: {
            Authorization: `Bearer ${session?.access}`,
          },
        },
      );
      if (resQuestions.ok) {
        return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
      }
      return new Response(JSON.stringify(await resQuestions.json()));
    }
  }
  const err = await resUpload.json();
  return new Response(JSON.stringify(err), { status: 500 });
}
export { POST };

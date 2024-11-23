"use server";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const session = await auth();
const answerSchema = z.object({
  description: z.string().min(10),
  questionId: z.string(),
});
const AddAnswerAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/answers/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidatePath(`/questions/${rawData?.id}`);
    redirect(`/questions/${rawData?.questionId}`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};

const SolvedAnswerAction = async (_prevState: any, formData: FormData) => {
  const resSolved = await fetch(
    `${process.env.BACKEND_URL}/answers/solving/${formData.get("answerId")}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
    },
  );
  if (resSolved.ok) {
    revalidateTag("Answer");
    revalidatePath(`/questions/${formData.get("questionId")}`);
  }
};

export { AddAnswerAction, SolvedAnswerAction };

"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const answerSchema = z.object({
  description: z.string().min(10),
  questionId: z.string(),
});
const AddAnswerAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
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

export { AddAnswerAction };

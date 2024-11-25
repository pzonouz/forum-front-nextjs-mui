"use server";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { AnswerType } from "../types/AnswerTypes";

const session = await auth();
const answerSchema = z.object({
  id: z.string().nullish(),
  description: z.string().min(10),
  questionId: z.string().nullish(),
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
const EditAnswerAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.id = undefined;
  validatedData.data.questionId = undefined;
  const res = await fetch(`${process.env.BACKEND_URL}/answers/${rawData?.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidatePath(`/questions/${rawData?.questionId}`);
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

const DeleteAnswerAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const resAnswer = await fetch(
    `${process.env.BACKEND_URL}/answers/${formData.get("id")}`,
  );
  const answer: AnswerType = await resAnswer.json();
  await fetch(`${process.env.BACKEND_URL}/answers/${formData.get("id")}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  revalidatePath(`/questions/${answer?.question?.id}`);
  redirect(`/questions/${answer?.question?.id}`);
};
export {
  AddAnswerAction,
  SolvedAnswerAction,
  EditAnswerAction,
  DeleteAnswerAction,
};

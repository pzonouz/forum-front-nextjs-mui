"use server";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { AnswerType } from "../types/AnswerTypes";

const answerSchema = z.object({
  id: z.string().nullish(),
  description: z.string().min(10),
  questionId: z.string().nullish(),
  filenames: z.array(z.string()).nullish(),
});
const CreateAnswerAction = async (
  id: any,
  filenames: string[],
  _prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const session = await auth();
  validatedData.data.questionId = id;
  validatedData.data.filenames = filenames;
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
    revalidatePath(`/Q&A/questions/${id}`);
    redirect(`/Q&A/questions/${id}`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};
const UpdateAnswerAction = async (
  id: any,
  questionId: any,
  filenames: string[],
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.filenames = filenames;
  const res = await fetch(`${process.env.BACKEND_URL}/answers/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidatePath(`/Q&A/questions/${questionId}`);
    redirect(`Q&A/questions/${questionId}`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};
const SolvedAnswerAction = async (
  id: any,
  quesionId: any,
  _prevState: any,
  _formData: FormData,
) => {
  const session = await auth();
  const resSolved = await fetch(
    `${process.env.BACKEND_URL}/answers/solving/${id}`,
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
    revalidatePath(`/Q&A/questions/${quesionId}`);
  }
};

const DeleteAnswerAction = async (
  id: any,
  _prevState: any,
  _formData: FormData,
) => {
  const session = await auth();
  const resAnswer = await fetch(`${process.env.BACKEND_URL}/answers/${id}`);
  const answer: AnswerType = await resAnswer.json();
  await fetch(`${process.env.BACKEND_URL}/answers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  revalidatePath(`/Q&A/questions/${answer?.question?.id}`);
  redirect(`/Q&A/questions/${answer?.question?.id}`);
};
export {
  CreateAnswerAction,
  SolvedAnswerAction,
  UpdateAnswerAction,
  DeleteAnswerAction,
};

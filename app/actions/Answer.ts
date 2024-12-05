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
const AddAnswerAction = async (
  id: any,
  _prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.questionId = id;
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
    revalidatePath(`/questions/${id}`);
    redirect(`/questions/${id}`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};
const EditAnswerAction = async (
  id: any,
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = answerSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
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
    revalidatePath(`/questions/${rawData?.questionId}`);
    redirect(`/questions/${rawData?.questionId}`);
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
    revalidatePath(`/questions/${quesionId}`);
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
  revalidatePath(`/questions/${answer?.question?.id}`);
  redirect(`/questions/${answer?.question?.id}`);
};
export {
  AddAnswerAction,
  SolvedAnswerAction,
  EditAnswerAction,
  DeleteAnswerAction,
};

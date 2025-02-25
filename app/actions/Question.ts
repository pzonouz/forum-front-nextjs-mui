"use server";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const questionSchema = z.object({
  title: z.string().min(5, { message: "حداقل ۵ حرف باید داشته باشد" }),
  description: z.string().min(10, { message: "حداقل ۱۰ حرف باید داشته باشد" }),
  filenames: z.array(z.string()).nullish(),
});
const CreateQuestionAction = async (
  text: string,
  filenames: string[],
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  formData.append("description", text);
  const rawData = Object.fromEntries(formData);
  const validatedData = questionSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.filenames = filenames;
  const res = await fetch(`${process.env.BACKEND_URL}/questions/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidateTag("Question");
    return { success: true };
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};
const UpdateQuestionAction = async (
  id: string,
  text: string,
  filenames: string[],
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  rawData.description = text;
  const validatedData = questionSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.filenames = filenames;
  const res = await fetch(`${process.env.BACKEND_URL}/questions/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidateTag("Question");
    redirect(`/Q&A/questions/${id}`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};

const DeleteQuestionAction = async (
  id: any,
  _prevState: any,
  _formData: FormData,
) => {
  const session = await auth();
  await fetch(`${process.env.BACKEND_URL}/questions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  revalidateTag("Question");
  redirect("/Q&A/questions");
};
export { CreateQuestionAction, UpdateQuestionAction, DeleteQuestionAction };

"use server";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const questionSchema = z.object({
  title: z.string().min(5, { message: "حداقل ۵ حرف باید داشته باشد" }),
  description: z.string().min(10, { message: "حداقل ۱۰ حرف باید داشته باشد" }),
});
const AddQuestionAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = questionSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
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
const EditQuestionAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = questionSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/questions/${rawData?.id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
      body: JSON.stringify(validatedData.data),
    },
  );
  if (res.ok) {
    revalidateTag("Question");
    redirect("/questions");
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};

const DeleteQuestionAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/questions/${formData.get("id")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
    },
  );
  revalidateTag("Question");
  redirect("/questions");
};
export { AddQuestionAction, EditQuestionAction, DeleteQuestionAction };

"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const questionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
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
    revalidatePath("/questions");
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
    revalidatePath("/questions");
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
  revalidatePath("/questions");
  redirect("/questions");
};
export { AddQuestionAction, EditQuestionAction, DeleteQuestionAction };

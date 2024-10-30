"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const newQuestionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
});
const AddQuestionAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const validatedData = newQuestionSchema.safeParse(rawData);
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
export { AddQuestionAction };

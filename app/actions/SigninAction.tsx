"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
const signinAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  try {
    const res = await signIn("credentials", {
      ...validatedData.data,
      redirect: false,
    });
    // console.log(res.error);
  } catch (e) {
    const formError = { formErrors: "Email and password doesn not match" };
    return { error: formError, data: rawData };
  }
  redirect("/profile");
};

export { signinAction };

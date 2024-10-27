"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";

const schema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        {
          message:
            "Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long",
        },
      ),
    password_confirm: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["password_confirm"],
      });
    }
  });
const signupAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedDate = schema.safeParse(rawData);
  if (validatedDate.error) {
    return { error: validatedDate.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedDate.data),
  });
  if (res.ok) {
    try {
      await signIn("credentials", {
        ...validatedDate.data,
        redirect: false,
      });
    } catch (e) {}
    redirect("/profile");
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedDate.data };
  }
};

export { signupAction };
"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";

let signUpSchema = z
  .object({
    email: z.string().email({ message: "فرمت ایمیل درست نیست" }),
    password: z
      .string()
      .regex(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        {
          message:
            "حداقل ۸ حرف،حداقل یک حرف کوچک،حداقل یک حرف بزرگ،حداقل یک عدد،حداقل یک نماد و حداقل یک کاراکتر خاص",
        },
      ),
    password_confirm: z.string().min(1, { message: "این فیلد باید پر شود" }),
    firstname: z.string().min(1, { message: "این فیلد باید پر شود" }),
    lastname: z.string().min(1, { message: "این فیلد باید پر شود" }),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسوردها مطابقت ندارد",
        path: ["password_confirm"],
      });
    }
  });
const signupAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedDate = signUpSchema.safeParse(rawData);
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

const signInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
const signinAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signInSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  try {
    await signIn("credentials", {
      ...validatedData.data,
      redirect: false,
    });
  } catch (e) {
    const formError = { formErrors: "Email and password doesn not match" };
    return { error: formError, data: rawData };
  }
  redirect("/questions");
};

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "فرمت ایمیل درست نیست" }),
});

const resetPasswordAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = forgetPasswordSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });
    if (res.ok) {
      return { success: true };
    } else {
      const err = { formErrors: JSON.stringify(await res.json()) };
      return { error: err, data: validatedData.data };
    }
  } catch {
    const err = { formError: "ایراد در سرور" };
    return { error: err, data: validatedData.data };
  }
};
const forgetPasswordCallbackSchema = z
  .object({
    password: z.string().min(1, { message: "این فیلد باید پر شود" }),
    password_confirm: z
      .string()
      .min(1)
      .regex(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        {
          message:
            "حداقل ۸ حرف،حداقل یک حرف کوچک،حداقل یک حرف بزرگ،حداقل یک عدد،حداقل یک نماد و حداقل یک کاراکتر خاص",
        },
      ),

    token: z.string().nullish(),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسوردها مطابقت ندارد",
        path: ["password_confirm"],
      });
    }
  });

const forgetPasswordCallbackAction = async (
  token: string,
  _prevState: any,
  formData: FormData,
) => {
  formData.append("token", token);
  const rawData = Object.fromEntries(formData);
  const validatedData = forgetPasswordCallbackSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/auth/reset_password_callback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
      },
    );
    if (res.ok) {
      return { success: true };
    } else {
      const err = {
        formErrors: JSON.stringify(await res.json()),
      };
      return { error: err, data: validatedData.data };
    }
  } catch {
    const err = { formError: "ایراد در سرور" };
    return { error: err, data: validatedData.data };
  }
};

export {
  signupAction,
  signinAction,
  resetPasswordAction,
  forgetPasswordCallbackAction,
};

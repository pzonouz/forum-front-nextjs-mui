"use server";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const fileSchema = z.object({
  title: z.string().min(5, { message: "حداقل ۵ حرف باید داشته باشد" }),
  filename: z.string().min(1, { message: "این فیلد باید پر شود" }),
});
export type AdminFileType = z.infer<typeof fileSchema>;
const CreateAdminFileAction = async (
  filename: string,
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  formData.append("filename", filename);
  const rawData = Object.fromEntries(formData);
  const validatedData = fileSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/files/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidateTag("File");
    return { success: true };
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};
const UpdateAdminFileAction = async (
  id: string,
  filename: string,
  _prevState: any,
  formData: FormData,
) => {
  const session = await auth();
  formData.append("filename", filename);
  const rawData = Object.fromEntries(formData);
  const validatedData = fileSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/files/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify(validatedData.data),
  });
  if (res.ok) {
    revalidateTag("File");
    redirect(`/admin`);
  } else {
    const error = await res.json();
    const errorObj = { formErrors: JSON.stringify(error.message) };
    return { error: errorObj, data: validatedData.data };
  }
};

const DeleteAdminFileAction = async (
  id: any,
  _prevState: any,
  _formData: FormData,
) => {
  const session = await auth();
  await fetch(`${process.env.BACKEND_URL}/files/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  revalidateTag("File");
  redirect("/admin");
};
export { CreateAdminFileAction, UpdateAdminFileAction, DeleteAdminFileAction };

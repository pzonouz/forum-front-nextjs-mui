"use server";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
});
const newQuestionAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  // TODO:Implement Create Queasion
};
export { newQuestionAction };

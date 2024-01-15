"use server";

import * as z from "zod";
import { LoginSchema } from "../schemas/index";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  console.log("validateFields on server = ", validateFields);

  if (!validateFields.success) {
    return { error: "Invalidate fields!" };
  }

  return { success: "Email sent!" };
};

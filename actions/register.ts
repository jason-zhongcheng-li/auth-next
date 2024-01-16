"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas/index";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  console.log("validateFields on server = ", validateFields);

  if (!validateFields.success) {
    return { error: "Invalidate fields!" };
  }

  return { success: "Email sent!" };
};

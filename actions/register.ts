"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";
import { RegisterSchema } from "../schemas/index";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  console.log("validateFields on server = ", validateFields);

  if (!validateFields.success) {
    return { error: "Invalidate fields!" };
  }

  const {
    data: { email, password, username },
  } = validateFields;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.users.create({
    data: { username, email, password: hashedPassword },
  });

  return { success: "User created!" };
};

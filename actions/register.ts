"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";
import { RegisterSchema } from "../schemas/index";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalidate fields!" };
  }

  const {
    data: { email, password, name },
  } = validateFields;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "Confirmation email sent!" };
};

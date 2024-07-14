import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 1000 * 60); // expires token in 1 min

  const existingToekn = await getVerificationTokenByEmail(email);

  if (existingToekn) {
    await db.verification_token.delete({ where: { id: existingToekn.id } });
  }

  const verificationToken = await db.verification_token.create({
    data: {
      email,
      token,
      expires,
      created_at: new Date(),
    },
  });

  return verificationToken;
};

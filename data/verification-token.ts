import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verification_token.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verification_token.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

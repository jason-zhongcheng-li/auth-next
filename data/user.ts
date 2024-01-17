import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.users.findUnique({ where: { email } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.users.findUnique({ where: { id } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

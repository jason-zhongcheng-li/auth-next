"use server";

import * as z from "zod";
import { LoginSchema } from "../schemas/index";

export const login = (values: z.infer<typeof LoginSchema>) => {
  console.log("values on server = ", values);
};

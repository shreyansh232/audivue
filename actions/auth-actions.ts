"use server";

import { auth } from "@/lib/auth";
import { BetterAuthError } from "better-auth";

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { sucess: true };
  } catch (error) {
    if (error instanceof BetterAuthError) {
      console.log(error.message);
    }
  }
};

"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { BetterAuthError, success } from "better-auth";
import { cookies, headers } from "next/headers";
import { toast } from "sonner";

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

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof BetterAuthError) {
      console.log(error.message);
    }
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({
      // This endpoint requires session cookies.
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof BetterAuthError) {
      console.log("Error occured", error.message);
    }
  }
};

export const getSession = async () => {
  const resolvedHeaders = await headers(); // ✅ resolves Promise
  return auth.api.getSession({
    headers: resolvedHeaders,
  });
};

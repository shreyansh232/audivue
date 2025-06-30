"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error during sign-in:", error);
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Error during sign-up:", error);
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/sign-in");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  console.log(data);

  if (error) {
    console.error("Error during sign-in with Google:", error);
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}

export async function getUserDetails() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check if user is null or undefined before logging
    if (!user) {
      console.log("No user session found.");
      return null;
    }

    console.log("Fetched user:", user);
    return user;
  } catch (e: any) {
    if (e.name === "AuthSessionMissingError" || e.__isAuthError) {
      console.log("No active session found for the user.");
      return null;
    }
    console.error("Caught an unexpected error in getUserDetails:", e);
    return null;
  }
}

import { schema } from "../db/schema";
import { db } from "../db/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    maxPasswordLength: 10,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    rateLimit: {
      enabled: true,
      window: 10, // time window in seconds
      max: 100, // max requests in the window
    },
  },
  plugins: [nextCookies()],
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});

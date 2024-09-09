import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   Specify your server-side environment variables schema here. This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // NODE ENV
    NODE_ENV: z.enum(["development", "test", "production"]),
    // AUTH SECRET
    AUTH_SECRET: z.string(),
    // GOOGLE AUTH
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    // DATABASE URL
    DRIZZLE_DATABASE_URL: z.string().url(),
  },

  /**
   Specify your client-side environment variables schema here. This way you can ensure the app isn't built with invalid env vars. 
   To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // APP URL
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
    // RESEND_API_KEY: process.env.RESEND_API_KEY,
    // RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,
    // RESEND_EMAIL_TO: process.env.RESEND_EMAIL_TO,
  },
  /**
   Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   This is especially useful for Docker builds.
   */
  // skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

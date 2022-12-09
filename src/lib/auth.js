import { Auth } from "@zalter/identity-js";

const noop = () => {};

export const ENABLE_AUTH = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

export const auth = ENABLE_AUTH
  ? new Auth({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    })
  : noop();

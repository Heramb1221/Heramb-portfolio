/** Base URL — always has no trailing slash. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://heramb.dev";

import { headers } from "next/headers";

const ipCache = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5;      // Max 5 submissions per minute to prevent spam

/**
 * Validates the caller's request session using IP-based rate limiting to prevent spam.
 * Throws an error if the request limit is exceeded.
 */
export async function validateSession(): Promise<void> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record || now > record.resetTime) {
    ipCache.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return;
  }

  if (record.count >= MAX_REQUESTS) {
    throw new Error("Too many requests. Please wait a minute before submitting again.");
  }

  record.count += 1;
}

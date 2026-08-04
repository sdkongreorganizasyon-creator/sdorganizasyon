import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

export function getRequestIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT?.trim() || "development-only-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

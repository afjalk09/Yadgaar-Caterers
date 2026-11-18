import { NextResponse } from "next/server";
import { buildWhatsAppUrl, enquirySchema } from "@/lib/enquiry";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    return Boolean(result && typeof result === "object" && (result as { success?: boolean }).success === true);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = checkRateLimit(`enquiry:${ip}`);

  if (!limit.allowed) {
    return json(
      { success: false, message: "Too many enquiries. Please wait a few minutes and try again." },
      429,
      { "Retry-After": "600" },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return json(
      { success: false, message: firstIssue?.message || "Please check the form and try again." },
      400,
    );
  }

  const spamVerified = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!spamVerified) {
    return json({ success: false, message: "Spam verification failed. Please try again." }, 400);
  }

  return json({
    success: true,
    data: { whatsappUrl: buildWhatsAppUrl(parsed.data) },
  });
}

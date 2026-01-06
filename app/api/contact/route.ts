import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

const RATE_LIMIT_WINDOW = 30_000;
const RATE_LIMIT_MAX = 3;

const hits = new Map<string, { count: number; ts: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
    return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const ipKey = ip === "unknown" ? "unknown-global" : ip;

    if (isRateLimited(ipKey)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, company } = body ?? {};
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : undefined;
    if (company) {
      return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    }

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400, headers: { "Cache-Control": "no-store" }  }
      );
    }

    if ( trimmedName.length > 100 ||
      trimmedEmail.length > 150 ||
      (trimmedSubject && trimmedSubject.length > 150) ||
      trimmedMessage.length > 2000
    ) {
      return NextResponse.json(
        { error: "Payload too large" },
        { status: 413 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeSubject = trimmedSubject
      ? escapeHtml(trimmedSubject)
      : `New message from ${safeName}`;
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: trimmedEmail,
      subject: safeSubject,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
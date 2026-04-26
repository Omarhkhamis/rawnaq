import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب."),
  phone: z.string().trim().min(1, "رقم الهاتف مطلوب."),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || "")
    .pipe(z.union([z.literal(""), z.email("البريد الإلكتروني غير صحيح.")])),
  message: z.string().trim().min(1, "نص الرسالة مطلوب."),
});

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const smtpPort = Number(process.env.SMTP_PORT ?? 587);

  if (!Number.isInteger(smtpPort)) {
    return NextResponse.json({ error: "SMTP_PORT is invalid." }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: getRequiredEnv("SMTP_HOST"),
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: getRequiredEnv("SMTP_USER"),
        pass: getRequiredEnv("SMTP_PASS"),
      },
    });
    const recipient = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const sender = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
    const { name, phone, email, message } = parsed.data;
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email || "غير مذكور");
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email || sender,
      subject: `رسالة جديدة من نموذج التواصل - ${name}`,
      text: [
        `الاسم: ${name}`,
        `رقم الهاتف: ${phone}`,
        `البريد الإلكتروني: ${email || "غير مذكور"}`,
        "",
        "الرسالة:",
        message,
      ].join("\n"),
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8;">
          <h2>رسالة جديدة من نموذج التواصل</h2>
          <p><strong>الاسم:</strong> ${safeName}</p>
          <p><strong>رقم الهاتف:</strong> ${safePhone}</p>
          <p><strong>البريد الإلكتروني:</strong> ${safeEmail}</p>
          <hr />
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر إرسال الرسالة حالياً." }, { status: 500 });
  }
}

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const adminSessionCookieName = "rawnaq_admin_session";

const sessionMaxAge = 60 * 60 * 8;

function getSessionSecret() {
  return (
    process.env.ADMIN_AUTH_SECRET ??
    process.env.AUTH_SECRET ??
    process.env.DATABASE_URL ??
    "rawnaq-local-admin-secret"
  );
}

function signSession(adminId: string) {
  return createHmac("sha256", getSessionSecret()).update(adminId).digest("hex");
}

export function createAdminSessionValue(adminId: string) {
  return `${adminId}.${signSession(adminId)}`;
}

export function verifyAdminSessionValue(value?: string) {
  if (!value) {
    return null;
  }

  const [adminId, signature] = value.split(".");

  if (!adminId || !signature) {
    return null;
  }

  const expectedSignature = signSession(adminId);
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer) ? adminId : null;
}

export async function getAdminSessionId() {
  const cookieStore = await cookies();
  return verifyAdminSessionValue(cookieStore.get(adminSessionCookieName)?.value);
}

export const adminSessionCookieOptions = {
  httpOnly: true,
  maxAge: sessionMaxAge,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

import { NextRequest, NextResponse } from "next/server";

import {
  adminSessionCookieName,
  adminSessionCookieOptions,
  createAdminSessionValue,
} from "@/lib/admin-auth";
import { verifyAdminCredentials } from "@/lib/content/repository";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const email = String(payload?.email ?? "");
  const password = String(payload?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "بيانات الدخول غير مكتملة." }, { status: 400 });
  }

  const admin = await verifyAdminCredentials(email, password);

  if (!admin) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  }

  const response = NextResponse.json({ admin });
  response.cookies.set(
    adminSessionCookieName,
    createAdminSessionValue(admin.id),
    adminSessionCookieOptions,
  );

  return response;
}

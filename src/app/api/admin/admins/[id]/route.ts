import { NextRequest, NextResponse } from "next/server";

import { getAdminSessionId } from "@/lib/admin-auth";
import { updateAdminAccount } from "@/lib/content/repository";

function validateAdminPayload(payload: unknown) {
  const data = payload as { email?: unknown; name?: unknown; password?: unknown } | null;
  const email = String(data?.email ?? "").trim();
  const name = String(data?.name ?? "").trim();
  const password = String(data?.password ?? "");

  if (!email || !email.includes("@")) {
    return { error: "البريد الإلكتروني غير صحيح." };
  }

  if (password && password.length < 6) {
    return { error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل." };
  }

  return { data: { email, name, password: password || undefined } };
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const adminId = await getAdminSessionId();

  if (!adminId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await context.params;
  const parsed = validateAdminPayload(await request.json().catch(() => null));

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const admin = await updateAdminAccount(id, parsed.data);

    if (!admin) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch {
    return NextResponse.json({ error: "البريد الإلكتروني مستخدم مسبقاً." }, { status: 400 });
  }
}

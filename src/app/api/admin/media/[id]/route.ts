import { NextRequest, NextResponse } from "next/server";

import { getAdminSessionId } from "@/lib/admin-auth";
import { deleteMediaAsset } from "@/lib/content/repository";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSessionId())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await context.params;
  await deleteMediaAsset(id);

  return NextResponse.json({ success: true });
}

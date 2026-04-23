import { NextRequest, NextResponse } from "next/server";

import { deleteMediaAsset } from "@/lib/content/repository";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await deleteMediaAsset(id);

  return NextResponse.json({ success: true });
}


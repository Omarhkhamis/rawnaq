import { NextRequest, NextResponse } from "next/server";

import { getAdminSessionId } from "@/lib/admin-auth";
import { storeMediaAsset } from "@/lib/content/repository";

export async function POST(request: NextRequest) {
  if (!(await getAdminSessionId())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const media = await storeMediaAsset(file, altText);
  return NextResponse.json(media);
}

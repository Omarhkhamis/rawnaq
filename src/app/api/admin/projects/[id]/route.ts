import { NextRequest, NextResponse } from "next/server";

import { getAdminSessionId } from "@/lib/admin-auth";
import { deleteProject, saveProject } from "@/lib/content/repository";
import { dashboardProjectSchema } from "@/lib/content/validation";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSessionId())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await context.params;
  const payload = await request.json();
  const parsed = dashboardProjectSchema.safeParse({
    ...payload,
    id,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const project = await saveProject(parsed.data);
  return NextResponse.json(project);
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSessionId())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await context.params;
  await deleteProject(id);

  return NextResponse.json({ success: true });
}

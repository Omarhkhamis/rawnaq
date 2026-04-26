import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/dashboard/admin-login-form";
import { getAdminSessionId } from "@/lib/admin-auth";
import { getAdminAccountById } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const adminId = await getAdminSessionId();
  const admin = adminId ? await getAdminAccountById(adminId) : null;

  if (admin) {
    redirect("/dashboard");
  }

  return <AdminLoginForm />;
}

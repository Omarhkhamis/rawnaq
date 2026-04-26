import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getAdminSessionId } from "@/lib/admin-auth";
import { isDashboardTabKey } from "@/lib/content/dashboard-tabs";
import { getAdminAccountById, getDashboardSnapshot } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

type DashboardTabPageProps = {
  params: Promise<{ tab: string }>;
};

export default async function DashboardTabPage({ params }: DashboardTabPageProps) {
  const adminId = await getAdminSessionId();
  const admin = adminId ? await getAdminAccountById(adminId) : null;

  if (!admin) {
    notFound();
  }

  const { tab } = await params;

  if (!isDashboardTabKey(tab)) {
    notFound();
  }

  const snapshot = await getDashboardSnapshot();

  return <DashboardShell activeTab={tab} currentAdmin={admin} initialSnapshot={snapshot} key={tab} />;
}

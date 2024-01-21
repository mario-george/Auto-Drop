import DashboardProtectWrapper from "@/components/dashboard-protect-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProtectWrapper>{children}</DashboardProtectWrapper>;
}

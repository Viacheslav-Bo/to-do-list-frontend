import Sidebar from "@/components/layout/SideBar/SideBar";
import RequireAuth from "@/components/providers/RequireAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1 lg:pl-64">{children}</div>
      </div>
    </RequireAuth>
  );
}

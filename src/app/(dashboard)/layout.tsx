import Sidebar from "@/components/layout/SideBar/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64">{children}</div>
    </div>
  );
}

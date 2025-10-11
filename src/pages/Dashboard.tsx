// pages/Dashboard.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SystemAdminDashboard } from "@/components/dashboard/SystemAdminDashboard";
import { LocalLeaderDashboard } from "@/components/dashboard/LocalLeaderDashboard";
import { PolicyMakerDashboard } from "@/components/dashboard/PolicyMakerDashboard";
import { CitizenDashboard } from "@/components/dashboard/CitizenDashboard";
import { useAuthContext } from "@/components/auth/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'system_admin':
        return <SystemAdminDashboard />;
      case 'local_leader':
        return <LocalLeaderDashboard />;
      case 'policy_maker':
        return <PolicyMakerDashboard />;
      case 'citizen':
        return <CitizenDashboard />;
      default:
        return <div>Unknown role: {user.role}</div>;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                {renderDashboard()}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Dashboard;
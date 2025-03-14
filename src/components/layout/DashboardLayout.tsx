
import { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar, 
  Tag, 
  BarChart, 
  Settings 
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/",
      active: location.pathname === "/",
    },
    {
      label: "Tasks",
      icon: <ListTodo className="h-5 w-5" />,
      href: "/tasks",
      active: location.pathname === "/tasks",
    },
    {
      label: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      href: "/calendar",
      active: location.pathname === "/calendar",
    },
    {
      label: "Categories",
      icon: <Tag className="h-5 w-5" />,
      href: "/categories",
      active: location.pathname === "/categories",
    },
    {
      label: "Reports",
      icon: <BarChart className="h-5 w-5" />,
      href: "/reports",
      active: location.pathname === "/reports",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">TaskMaster</h1>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <Link to={route.href}>
                    <SidebarMenuButton 
                      isActive={route.active}
                      tooltip={route.label}
                    >
                      {route.icon}
                      <span>{route.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                U
              </div>
              <div>
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

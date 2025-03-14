
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  Tag,
  BarChart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <MobileSidebar routes={routes} setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen border-r flex-col bg-card",
          className
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">TaskMaster</h1>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {routes.map((route) => (
              <Link key={route.href} to={route.href}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2 text-base",
                    route.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 border-t">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              U
            </div>
            <div>
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Mobile sidebar with close button
const MobileSidebar = ({
  routes,
  setOpen,
}: {
  routes: {
    label: string;
    icon: React.ReactNode;
    href: string;
    active: boolean;
  }[];
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-primary">TaskMaster</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              onClick={() => setOpen(false)}
            >
              <Button
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 text-base",
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {route.icon}
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="p-6 border-t">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

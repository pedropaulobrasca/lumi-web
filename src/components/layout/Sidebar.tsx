import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText } from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: location.pathname === "/"
    },
    {
      href: "/faturas",
      label: "Faturas",
      icon: FileText,
      active: location.pathname === "/faturas"
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <ShadcnSidebar className={className}>
        <SidebarHeader className="border-b px-6 py-4">
          <h2 className="text-xl font-bold">Lumi</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={route.active}
                >
                  <Link to={route.href} className="flex items-center gap-3">
                    <route.icon className="h-5 w-5" />
                    <span>{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <SidebarTrigger />
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
}

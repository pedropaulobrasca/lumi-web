import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Sun, Moon, User, LogOut } from "lucide-react";
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
import { useState, useEffect } from "react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Verificar preferência de tema
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  // Alternar entre temas claro e escuro
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

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
      <ShadcnSidebar className={`${className} bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg`}>
        <SidebarHeader className="border-b border-blue-100 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Lumi</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 py-6">
          <div className="mb-6 px-3">
            <div className="relative">
              <div className="h-24 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 mb-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik0yOS41IDE4LjVoMXYxM2gtMXpNMzEuNSAzMC41djFoLTEzdi0xeiIvPjwvZz48L2c+PC9zdmc+')]" />
              </div>
              <div className="absolute bottom-2 left-3 text-white">
                <p className="text-sm font-medium">Bem-vindo ao</p>
                <p className="text-lg font-bold">Lumi Energy</p>
              </div>
            </div>
          </div>
          <div className="mb-4 px-3">
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2 tracking-wider">Menu Principal</h3>
          </div>
          <SidebarMenu className="space-y-3">
            {routes.map((route) => (
              <SidebarMenuItem key={route.href} className="mb-2">
                <SidebarMenuButton
                  asChild
                  isActive={route.active}
                  className={`rounded-lg transition-all duration-200 ${route.active ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-blue-50 dark:hover:bg-gray-800'}`}
                >
                  <Link to={route.href} className="flex items-center gap-4 px-4 py-3.5">
                    <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${route.active ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'}`}>
                      <route.icon className="h-5 w-5" />
                    </div>
                    <span className={`font-medium text-base ${route.active ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-blue-100 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between px-3 mb-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span className="text-sm">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span className="text-sm">Modo Escuro</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Usuário</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
          <SidebarTrigger className="hidden" />
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
}

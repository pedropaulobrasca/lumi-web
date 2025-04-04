import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detectar se é um dispositivo móvel baseado no tamanho da tela
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setSidebarOpen(!isMobileView); // Sidebar aberta por padrão em desktop, fechada em mobile
    };

    // Verificar inicialmente
    checkIfMobile();

    // Adicionar listener para redimensionamento da janela
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - com posicionamento fixo em mobile e normal em desktop */}
      <div 
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out' : 'w-64 flex-shrink-0'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <Sidebar className="h-full" />
      </div>

      {/* Overlay para fechar o sidebar em mobile quando clicado fora */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-200 ease-in-out" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Botão para abrir/fechar sidebar em dispositivos móveis */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={`fixed top-4 left-4 z-50 md:hidden`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}

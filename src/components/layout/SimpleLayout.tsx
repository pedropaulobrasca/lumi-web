import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText } from "lucide-react";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export function SimpleLayout({ children }: SimpleLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar simples */}
      <div className="w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Lumi</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/" 
                    ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400" 
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/faturas" 
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/faturas" 
                    ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400" 
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                <span>Faturas</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

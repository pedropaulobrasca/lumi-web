import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { InvoicesPage } from "@/pages/InvoicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: "/faturas",
    element: (
      <MainLayout>
        <InvoicesPage />
      </MainLayout>
    ),
  },
]);

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { InvoicesPage } from "./pages/InvoicesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/faturas" element={
          <MainLayout>
            <InvoicesPage />
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

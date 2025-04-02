import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleLayout } from "./components/layout/SimpleLayout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { InvoicesPage } from "./pages/InvoicesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SimpleLayout>
            <Dashboard />
          </SimpleLayout>
        } />
        <Route path="/faturas" element={
          <SimpleLayout>
            <InvoicesPage />
          </SimpleLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

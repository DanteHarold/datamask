import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginLayout from "./layout/LoginLayout";
import LoginVerificar from "./pages/Login/LoginVerificar";
import LoginPassword from "./pages/Login/LoginPassword";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login-verificar" element={<LoginVerificar />} index />
          <Route path="/login-password" element={<LoginPassword />} index />
          <Route path="/login" element={<LoginPage />} index />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

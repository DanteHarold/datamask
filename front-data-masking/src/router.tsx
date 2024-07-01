import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  LoginPassword,
  LoginVerificar,
  VistasPage,
  DetallePage,
} from "./pages";
import { DashboardLayout, LoginLayout } from "./layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login-verificar" element={<LoginVerificar />} />
          <Route path="/login-password" element={<LoginPassword />} />
          <Route path="/login" element={<LoginPage />} index />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/vistas" element={<VistasPage />} index />
          <Route path="/detalle" element={<DetallePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

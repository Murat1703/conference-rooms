import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ user, loading })=>{
  if (loading) return <div style={{ padding: 20 }}>Проверяем авторизацию…</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

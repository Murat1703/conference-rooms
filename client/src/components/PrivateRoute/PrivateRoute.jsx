import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = ({ user, loading }) => {


  const location = useLocation();


  if (loading) {
    return <div style={{ padding: 20 }}>Проверяем авторизацию…</div>;
  }

  if (!user) {
    // сохраним, куда хотел пойти пользователь
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

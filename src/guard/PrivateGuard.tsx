// test
import { ModuleRoutes } from "@/pages/routes";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateGuard = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Outlet /> : <Navigate to={ModuleRoutes.Login} replace />;
};

export const PublicGuard = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Navigate to={ModuleRoutes.Home} replace /> : <Outlet />;
};

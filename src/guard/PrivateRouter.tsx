// test?
import { RoutesWithNotFound } from "@/pages/components/RoutesWithNotFound/routesWithNotFound";
import { Home } from "@/pages/Home/home";
import { ModuleRoutes } from "@/pages/routes";
import { Summary } from "@/pages/Summary/Summary";
import { Navigate, Route } from "react-router-dom";

export const PrivateRouter = () => {
    return (
        <RoutesWithNotFound>
          {/* // usemos el Navigate con Route * para redireccio automatica por defecto */}
        <Route path={ModuleRoutes.Init} element={<Navigate to={ModuleRoutes.Home} />} />
        <Route path={ModuleRoutes.Home} element={<Home />} />
        <Route path={ModuleRoutes.Summary} element={<Summary />} />
      </RoutesWithNotFound>
    );
};

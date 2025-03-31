// test
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./pages/components/RoutesWithNotFound/routesWithNotFound";
import { ModuleRoutes } from "./pages/routes";

import { PrivateGuard, PublicGuard } from "./guard/PrivateGuard";
import { PrivateRouter } from "./guard/PrivateRouter";
import { Footer } from "./pages/components/Footer/Footer";
import { Navbar } from "./pages/components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <RoutesWithNotFound>
                <Route
                    path={ModuleRoutes.Init}
                    element={<Navigate to={ModuleRoutes.Login} />}
                />
                <Route element={<PublicGuard />}>
                    <Route path={ModuleRoutes.Login} element={<Login />} />
                </Route>
                <Route element={<PublicGuard />}>
                    <Route path={ModuleRoutes.SignUp} element={<Signup />} />
                </Route>
                <Route element={<PrivateGuard />}>
                    <Route path="/*" element={<PrivateRouter />} />
                </Route>
            </RoutesWithNotFound>
            <Footer />
        </BrowserRouter>
    );
};

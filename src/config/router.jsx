import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Register from "../routes/Register";
import RequireAuth from "../components/layouts/RequireAuth";
import PublicLayout from "../components/layouts/PublicLayout";
import NotFound from "../components/layouts/NotFound";
import LayoutRedirect from "../components/layouts/LayoutRedirect";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <RequireAuth />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                ],
            },
            {
                path: "/",
                element: <PublicLayout />,
                children: [
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/register",
                        element: <Register />,
                    },
                ],
            },
        ],
    },
    {
        path: "/:nanoid",
        element: <LayoutRedirect />,
        children: [
            {
                index: true,
                element: <NotFound />,
            },
        ],
    },
]);

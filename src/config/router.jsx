import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Register from "../routes/Register";
import RequireAuth from "../components/RequireAuth";
import PublicLayout from "../components/PublicLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: (
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                ),
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
]);

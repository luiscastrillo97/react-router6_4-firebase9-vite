import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Root from "../routes/Root";
import RequireAuth from "../components/RequireAuth";

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
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

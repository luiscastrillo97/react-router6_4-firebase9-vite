import { useUserContext } from "../../hooks/useUserContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="p-4 mx-auto">
            <Outlet />
        </div>
    );
};

export default RequireAuth;

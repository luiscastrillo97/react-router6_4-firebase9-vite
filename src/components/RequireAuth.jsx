import { useUserContext } from "../hooks/useUserContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { user, setUser } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;

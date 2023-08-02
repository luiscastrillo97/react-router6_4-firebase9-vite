import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        setUser(true);
        navigate("/");
    };
    return (
        <>
            <h2>Login</h2>
            {!user && <button onClick={handleLogin}>Acceder</button>}
        </>
    );
};

export default Login;

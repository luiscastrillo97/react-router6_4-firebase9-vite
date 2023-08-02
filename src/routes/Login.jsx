import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useEffect, useState } from "react";
import { signInUser } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentials = await signInUser({ email, password });
            navigate("/");
        } catch (error) {
            console.log(error.code);
        }
    };

    if (user) {
        return <h2>Loading app...</h2>;
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese email..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ingrese password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
        </>
    );
};

export default Login;

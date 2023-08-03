import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useState } from "react";
import { signInUser } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInUser({ email, password });
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
            <h2>Sing In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
        </>
    );
};

export default Login;

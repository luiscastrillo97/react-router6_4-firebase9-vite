import { useState } from "react";
import { registerUser } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
    const [email, setEmail] = useState("");
    useRedirectActiveUser(user, "/");
    const [password, setPassword] = useState("");
    const { user } = useUserContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentialUser = await registerUser({ email, password });
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese email..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ingrese contraseña..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};

export default Register;

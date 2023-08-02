import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../config/firebase";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const handleLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <nav>
                <div>Ícono</div>
                <ul>
                    {user ? (
                        <>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <button onClick={handleLogOut}>Logout</button>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Sign In</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Sign Up</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default NavBar;

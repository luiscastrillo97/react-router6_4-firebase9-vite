import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <nav>
                <div>Ícono</div>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {!user && (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>
                {user && <button onClick={() => setUser(false)}>Logout</button>}
            </nav>
        </>
    );
};

export default NavBar;

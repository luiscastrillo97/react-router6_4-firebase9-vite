import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import { signOutUser } from "../config/firebase";
import icon from "../assets/icon.png";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut, LuLogIn } from "react-icons/lu";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const { pathname } = useLocation();

    const handleLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {}
    };

    const buttonBlueClass =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center";

    const buttonRedClass =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 text-center";
    return (
        <nav className="flex justify-center bg-white border-2 border-gray-200">
            <div className="flex flex-wrap items-center justify-between w-4/5 py-4">
                <Link to="/" className="flex items-center">
                    <img src={icon} alt="Icon" className="h-8 w-8" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        URL Shortener
                    </span>
                </Link>
                {user ? (
                    <button onClick={handleLogOut} className={buttonRedClass}>
                        <LuLogOut className="sm:hidden" />
                        <span className="hidden sm:contents">Logout</span>
                    </button>
                ) : (
                    <div>
                        {pathname !== "/login" ? (
                            <NavLink to="/login">
                                <button className={buttonBlueClass}>
                                    <LuLogIn className="sm:hidden" />
                                    <span className="hidden sm:contents">
                                        Sign In
                                    </span>
                                </button>
                            </NavLink>
                        ) : (
                            <NavLink to="/register">
                                <button className={buttonBlueClass}>
                                    <FaRegUser className="sm:hidden" />
                                    <span className="hidden sm:contents">
                                        Sign Up
                                    </span>
                                </button>
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

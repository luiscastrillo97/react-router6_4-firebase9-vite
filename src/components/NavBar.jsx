import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, NavLink } from "react-router-dom";
import { signOutUser } from "../config/firebase";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const handleLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            // console.log(error);
        }
    };

    const buttonBlueClass =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0";

    const buttonRedClass =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0";
    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Ícono
                    </span>
                </Link>
                <div className="w-full sm:w-auto">
                    <ul className="font-medium flex items-center p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-white">
                        {user ? (
                            <>
                                <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded sm:bg-transparent sm:text-blue-700 sm:p-0">
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <button
                                    onClick={handleLogOut}
                                    className={buttonRedClass}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <li className={buttonBlueClass}>
                                    <NavLink to="/login">Sign In</NavLink>
                                </li>
                                <li className={buttonBlueClass}>
                                    <NavLink to="/register">Sign Up</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

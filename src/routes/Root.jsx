import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useUserContext } from "../hooks/useUserContext";
import { Spinner } from "flowbite-react";

const Root = () => {
    const { user } = useUserContext();

    if (user === false) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Root;

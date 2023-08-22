import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useUserContext } from "../hooks/useUserContext";

const Root = () => {
    const { user } = useUserContext();

    if (user === false) {
        return <p>Loading app...</p>;
    }

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Root;

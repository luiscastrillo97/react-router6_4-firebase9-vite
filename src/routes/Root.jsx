import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root = () => {
    return (
        <>
            <NavBar />
            <h1>Root</h1>
            <Outlet />
        </>
    );
};

export default Root;

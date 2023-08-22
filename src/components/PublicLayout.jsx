import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="m-10 w-96 mx-auto">
            <Outlet />
        </div>
    );
};

export default PublicLayout;

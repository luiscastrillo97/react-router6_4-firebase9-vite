import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="flex justify-center m-10 mx-auto w-4/5">
            <main className="w-full sm:w-4/5 lg:w-3/5 xl:w-1/2">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;

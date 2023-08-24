import FormTitle from "../FormTitle";
import NavBar from "../NavBar";

const NotFound = () => {
    return (
        <div>
            <NavBar />
            <main className="mx-auto">
                <FormTitle title="404 Not Found" />
            </main>
        </div>
    );
};

export default NotFound;

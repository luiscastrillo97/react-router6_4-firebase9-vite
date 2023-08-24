import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import FormTitle from "../FormTitle";
import NavBar from "../NavBar";

const LayoutRedirect = () => {
    const { nanoid } = useParams();
    const { searchData } = useFirestore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchData(nanoid).then((docSnap) => {
            if (docSnap.exists()) {
                window.location.href = docSnap.data().origin;
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <FormTitle title="Cargando redireccionamiento..." />;

    return (
        <div className="mx-auto container">
            <Outlet />
        </div>
    );
};

export default LayoutRedirect;

import { useEffect, useState } from "react";
import FormTitle from "../components/FormTitle";
import { useFirestore } from "../hooks/useFirestore";
import FormButton from "../components/FormButton";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { errorsFirebase } from "../utils/errorsFirebase";

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateUrl } =
        useFirestore();
    const { required, patternURL } = formValidate();
    const [newOriginId, setNewOriginId] = useState();
    const [copy, setCopy] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        resetField,
        setError,
    } = useForm();

    useEffect(() => {
        // console.log("getData");
        getData();
    }, []);

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginId) {
                await updateUrl(newOriginId, url);
                setNewOriginId();
            } else {
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            const { message } = errorsFirebase(error.code);
            setError("url", message);
        }
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setValue("url", item.origin);
        setNewOriginId(item.nanoid);
    };

    const pathURL = window.location.href;

    const handleClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(pathURL + nanoid);
        // console.log("Copiado");
        setCopy({ [nanoid]: true });
    };

    if (loading.getData) return <p>Loading data...</p>;
    if (error) return <p>{error}...</p>;

    return (
        <div>
            <FormTitle title="URLs Admin" />

            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <FormInput
                    type="text"
                    placeholder="http://luiscastrillo.org"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    label="Your url"
                    error={errors?.url}
                >
                    <FormError error={errors?.url} />
                </FormInput>
                {newOriginId ? (
                    <FormButton
                        type="submit"
                        text="Edit URL"
                        color="green"
                        loading={loading.updateUrl}
                    />
                ) : (
                    <FormButton
                        type="submit"
                        text="Add URL"
                        color="blue"
                        loading={loading.addData}
                    />
                )}
            </form>

            {data.map((item) => (
                <div
                    key={item.nanoid}
                    className="block p-6 bg-white border mb-2 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoid}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                        {item.origin}
                    </p>
                    <FormButton
                        type="button"
                        text="Delete"
                        color="red"
                        loading={loading[item.nanoid]}
                        onClick={() => handleClickDelete(item.nanoid)}
                    />
                    <FormButton
                        type="button"
                        text="Edit"
                        color="green"
                        onClick={() => handleClickEdit(item)}
                    />
                    <FormButton
                        type="button"
                        text={copy[item.nanoid] ? "Copied" : "Copy"}
                        color="blue"
                        onClick={() => handleClickCopy(item.nanoid)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Home;

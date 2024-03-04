import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import FormButton from "../components/FormButton";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { errorsFirebase } from "../utils/errorsFirebase";
import { FaTrashAlt, FaCopy, FaCheckSquare } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { Loader } from "../components/Loader";

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
        setCopy({ [nanoid]: true });
        setTimeout(() => {
            setCopy({ [nanoid]: false });
        }, 2500);
    };

    if (loading.getData) return <Loader />;
    if (error) return <p>Sorry. Try again later.</p>;

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <FormInput
                    type="text"
                    placeholder="http://luiscastrillo.org"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    label="URL"
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
                    >
                        Edit URL
                    </FormButton>
                ) : (
                    <FormButton
                        type="submit"
                        text="Add URL"
                        color="blue"
                        loading={loading.addData}
                    >
                        Add URL
                    </FormButton>
                )}
            </form>

            {data.map((item) => (
                <div
                    key={item.nanoid}
                    className="block p-6 bg-white border mb-2 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoid}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                        {item.origin}
                    </p>
                    <div className="flex gap-2">
                        <FormButton
                            type="button"
                            text="Delete"
                            color="red"
                            loading={loading[item.nanoid]}
                            onClick={() => handleClickDelete(item.nanoid)}
                        >
                            <FaTrashAlt />
                        </FormButton>
                        <FormButton
                            type="button"
                            text="Edit"
                            color="green"
                            onClick={() => handleClickEdit(item)}
                        >
                            <BsPencilSquare />
                        </FormButton>
                        <FormButton
                            type="button"
                            text={copy[item.nanoid] ? "Copied" : "Copy"}
                            color="blue"
                            onClick={() => handleClickCopy(item.nanoid)}
                        >
                            {copy[item.nanoid] ? <FaCheckSquare /> : <FaCopy />}
                        </FormButton>
                        <a href={item.origin} target="_blanck">
                            <FormButton type="button" text="Open" color="gray">
                                <MdOpenInNew />
                            </FormButton>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;

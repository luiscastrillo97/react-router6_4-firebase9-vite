import { useEffect, useState } from "react";
import FormTitle from "../components/FormTitle";
import { useFirestore } from "../hooks/useFirestore";
import FormButton from "../components/FormButton";
import { nanoid } from "nanoid";

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateUrl } =
        useFirestore();
    const [text, setText] = useState("");
    const [newOriginId, setNewOriginId] = useState();

    useEffect(() => {
        // console.log("getData");
        getData();
    }, []);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (newOriginId) {
            await updateUrl(newOriginId, text);
            setNewOriginId();
            setText("");
            return;
        }
        await addData(text);
        setText("");
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setText(item.origin);
        setNewOriginId(item.nanoid);
    };

    if (loading.getData) return <p>Loading data...</p>;
    if (error) return <p>{error}...</p>;
    return (
        <>
            <FormTitle title="Home" />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="e.g. http://luiscastrillo.org"
                    value={text}
                    onChange={(evt) => setText(evt.target.value)}
                />
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
                <div key={item.nanoid}>
                    <p>{item.nanoid}</p>
                    <p>{item.origin}</p>
                    <p>{item.uid}</p>
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
                </div>
            ))}
        </>
    );
};

export default Home;

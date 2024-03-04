import ButtonLoading from "./ButtonLoading";

const FormButton = ({
    text,
    type,
    color = "purple",
    width = "",
    loading,
    onClick,
    children,
}) => {
    if (loading) return <ButtonLoading width={width} color={color} />;
    const buttonClass = `text-white ${width} bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-${color}-600 dark:hover:bg-${color}-700 focus:outline-none dark:focus:ring-${color}-800`;

    return (
        <>
            <button onClick={onClick} type={type} className={buttonClass}>
                <span className="sm:hidden">{children}</span>
                <p className="hidden sm:contents">{text}</p>
            </button>
        </>
    );
};

export default FormButton;

export const formValidate = () => {
    return {
        required: { value: true, message: "Required field" },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Invalid email",
        },
        minLengthPassword: (value) => ({
            value,
            message: `Min ${value} characters`,
        }),
        validateEmpty: {
            empty: (value) => {
                return !value.trim() ? "No seas 🤡, escribe algo" : true;
            },
        },
        validateEquals(valuePassword) {
            return {
                equals: (value) =>
                    value === valuePassword || "Passwords do not match",
            };
        },
    };
};

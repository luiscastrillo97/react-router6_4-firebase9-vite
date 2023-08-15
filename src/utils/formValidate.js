export const formValidate = () => {
    return {
        required: { value: true, message: "Required field" },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Invalid email",
        },
        minLength: { value: 6, message: "Min 6 characters" },
        validateEmpty: {
            empty: (value) => {
                return !value.trim() ? "No seas 🤡, escribe algo" : true;
            },
        },
        validateEquals(getValues) {
            return {
                equals: (value) =>
                    value === getValues("password") || "Passwords do not match",
            };
        },
    };
};

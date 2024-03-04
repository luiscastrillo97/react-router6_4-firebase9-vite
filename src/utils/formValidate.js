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
                return !value.trim() ? "Required field" : true;
            },
        },
        validateEquals(valuePassword) {
            return {
                equals: (value) =>
                    value === valuePassword || "Passwords do not match",
            };
        },
        patternURL: {
            value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: "Invalid url",
        },
    };
};

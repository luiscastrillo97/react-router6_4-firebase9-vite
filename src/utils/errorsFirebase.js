export const errorsFirebase = (errorCode) => {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return {
                code: "email",
                message: "User already registered",
            };
        case "auth/invalid-email":
            return {
                code: "email",
                message: "Invalid email",
            };
        case "auth/user-not-found":
            return {
                code: "email",
                message: "User not registered",
            };
        case "auth/invalid-password":
            return {
                code: "password",
                message: "Min 6 characters password",
            };
        case "auth/wrong-password":
            return {
                code: "password",
                message: "Wrong password",
            };
        default:
            return {
                code: "email",
                message: "Sorry, server error. Try later",
            };
    }
};

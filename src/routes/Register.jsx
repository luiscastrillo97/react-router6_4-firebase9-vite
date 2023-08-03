import { useState } from "react";
import { registerUser } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser({
                email,
                password,
            });
            navigate("/");
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", {
                        message: "User already registered",
                    });
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Invalid email",
                    });
                    break;
                default:
                    console.log("Sorry. Try later");
            }
        }
    };

    if (user) {
        return <h2>Loading app...</h2>;
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email Address*"
                    {...register("email", {
                        required: { value: true, message: "Required field" },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: "Invalid email",
                        },
                    })}
                    // value={email}
                    // onChange={(event) => setEmail(event.target.value)}
                />
                {errors?.email && <p>{errors?.email.message}</p>}
                <input
                    type="password"
                    placeholder="Password *"
                    {...register("password", {
                        minLength: { value: 6, message: "Min 6 characters" },
                        validate: {
                            empty: (value) =>
                                !value.trim()
                                    ? "No seas 🤡 escribe algo"
                                    : true,
                        },
                    })}
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                />
                {errors?.password && <p>{errors?.password.message}</p>}
                <input
                    type="password"
                    placeholder="Password again *"
                    {...register("repassword", {
                        validate: {
                            equals: (value) =>
                                value === getValues("password") ||
                                "Passwords do not match",
                        },
                    })}
                />
                {errors?.repassword && <p>{errors?.repassword.message}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};

export default Register;

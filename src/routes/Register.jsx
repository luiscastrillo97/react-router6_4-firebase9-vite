import { useState } from "react";
import { registerUser } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {
    const { required, patternEmail, minLength, validateEmpty, validateEquals } =
        formValidate();
    const { user } = useUserContext();
    if (user) {
        return <h2>Loading app...</h2>;
    }
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
            const { code, message } = errorsFirebase(error.code);
            setError(code, { message });
        }
    };

    return (
        <>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Email Address*"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormError error={errors?.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Password *"
                    {...register("password", {
                        minLength,
                        validate: validateEmpty,
                    })}
                >
                    <FormError error={errors?.password} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Password again *"
                    {...register("repassword", {
                        validate: validateEquals(getValues),
                    })}
                >
                    <FormError error={errors?.repassword} />
                </FormInput>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};

export default Register;

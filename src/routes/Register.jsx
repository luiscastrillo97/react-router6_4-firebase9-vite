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
import FormTitle from "../components/FormTitle";
import FormButton from "../components/FormButton";

const Register = () => {
    const {
        required,
        patternEmail,
        minLengthPassword,
        validateEmpty,
        validateEquals,
    } = formValidate();
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            await registerUser({
                email,
                password,
            });
            navigate("/");
        } catch (error) {
            // console.log(error.code);
            const { code, message } = errorsFirebase(error.code);
            setError(code, { message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <FormTitle title="Sign Up" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Email Address*"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    label="Your Email"
                    error={errors?.email}
                >
                    <FormError error={errors?.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Password *"
                    {...register("password", {
                        minLength: minLengthPassword(6),
                        validate: validateEmpty,
                    })}
                    label="Your Password"
                    error={errors?.password}
                >
                    <FormError error={errors?.password} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Password again *"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    label="Repeat Password"
                    error={errors?.repassword}
                >
                    <FormError error={errors?.repassword} />
                </FormInput>
                <FormButton text="Sign Up" type="submit" loading={loading} />
            </form>
        </main>
    );
};

export default Register;

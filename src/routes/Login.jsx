import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { signInUser } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { errorsFirebase } from "../utils/errorsFirebase";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import FormTitle from "../components/FormTitle";
import FormButton from "../components/FormButton";
import { useState } from "react";

const Login = () => {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    useRedirectActiveUser(user, "/");
    const navigate = useNavigate();
    const { required, patternEmail, minLengthPassword, validateEmpty } =
        formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            await signInUser({
                email,
                password,
            });
            navigate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error.code);
            setError(code, { message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <FormTitle title="Sign In" />
            <FormError error={errors?.firebase} />
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
                <FormButton
                    width="w-full"
                    text="Sign In"
                    type="submit"
                    loading={loading}
                >
                    Sign In
                </FormButton>
            </form>
        </section>
    );
};

export default Login;

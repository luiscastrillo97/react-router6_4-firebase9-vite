import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { signInUser } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { errorsFirebase } from "../utils/errorsFirebase";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Login = () => {
    const { user } = useUserContext();
    if (user) {
        return <h2>Loading app...</h2>;
    }
    useRedirectActiveUser(user, "/");
    const { required, patternEmail, minLength, validateEmpty } = formValidate();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await signInUser({
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
            <h2>Sing In</h2>
            <FormError error={errors?.firebase} />
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
                <button type="submit">Sign In</button>
            </form>
        </>
    );
};

export default Login;

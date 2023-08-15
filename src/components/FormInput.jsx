import { forwardRef } from "react";

const FormInput = forwardRef(({ ...props }, ref) => {
    const { type, placeholder, onChange, onBlur, name, children } = {
        ...props,
    };
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
            />
            {children}
        </>
    );
});

export default FormInput;

// falta test
import { zodResolver } from "@hookform/resolvers/zod";
import "css/form.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { ButtonForm } from "../components/Form/ButtonForm/ButtonForm";
import { InputSignUp } from "../components/Form/InputForm/InputSignUp";
import {
    FormValuesSignUp,
    schemaSignUp,
} from "../components/Form/schema/form.schema";
import { ModuleRoutes } from "../routes";

export const Signup = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesSignUp>({
        resolver: zodResolver(schemaSignUp),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormValuesSignUp> = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="form-container">
                <section className="form-section">
                    <figure className="form-logo">
                        <img
                            src="src/assets/logos/logo-shop-main.svg"
                            alt="Logo de la tienda"
                        />
                    </figure>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <InputSignUp
                            name="username"
                            control={control}
                            error={errors.username}
                            type="text"
                            placeholder="User name"
                        />
                        <InputSignUp
                            name="email"
                            control={control}
                            error={errors.email}
                            type="email"
                            placeholder="Email"
                        />
                        <InputSignUp
                            name="password"
                            control={control}
                            error={errors.password}
                            type="password"
                            placeholder="Password"
                        />
                        <InputSignUp
                            name="confirmPassword"
                            control={control}
                            error={errors.confirmPassword}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <ButtonForm nameButton="Sign Up" />
                    </form>
                    <footer className="form-footer">
                        <div className="form-footer__logIn">
                            <p>Do you have an account?</p>
                            <NavLink
                                to={ModuleRoutes.Login}
                                className="form-link"
                            >
                                Log In
                            </NavLink>
                        </div>
                    </footer>
                </section>
            </div>
        </>
    );
};

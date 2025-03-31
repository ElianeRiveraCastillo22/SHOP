// no tiene test
import { useModalContext } from "@/context/Modal/UseModalContext";
import { useUserContext } from "@/context/user/useUserContext";
import { loginUser } from "@/services/apiuser.service";
/* import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

 */
import { zodResolver } from "@hookform/resolvers/zod";

import "css/form.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { InputLogin } from "../components/Form/InputForm/InputLogin";
import {
    FormValuesLogin,
    schemaLogin,
} from "../components/Form/schema/form.schema";
import { Modal } from "../components/Modal/Modal";
import { ModuleRoutes } from "../routes";
import { ForgotPassword } from "./components/ForgotPassword";
import { useEffect, useState } from "react";
import { ButtonForm } from "../components/Form/ButtonForm/ButtonForm";

export const Login = () => {
    const { isOpenModal, setIsOpenModal } = useModalContext();
    const { setUserCredentials } = useUserContext();
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesLogin>({
        resolver: zodResolver(schemaLogin),
        mode: "onBlur",
        // entiendo el proposito pero esto no se debe hacer, por otro lado para que es necesario el correo?
        defaultValues: {
            username: "emilys",
            email: "emily.johnson@x.dummyjson.com",
            password: "emilyspass",
        },
    });

    const onSubmit: SubmitHandler<FormValuesLogin> = async (credentialUser) => {
        const { username, password } = credentialUser;
        try {
            const userCredentials = await loginUser(username, password);
            setUserCredentials(userCredentials);
            // esto puede ser un util para evitar escribirlo manualmente
            localStorage.setItem("accessToken", userCredentials.accessToken);
            localStorage.setItem(
                "user",
                `${userCredentials.firstName} ${userCredentials.lastName}`
            );
            navigate(ModuleRoutes.Home);
        } catch (error) {
            if(error instanceof Error ){
                setError(error);
            }
        }
    };
    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);

    const openModal = () => {
        setIsOpenModal(true);
    };

    return (
        <div className="form-container">
            <section className="form-section">
                <figure className="form-logo">
                    <img
                        src="src/assets/logos/logo-shop-main.svg"
                        alt="Logo de la tienda"
                    />
                </figure>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <InputLogin
                        name="username"
                        control={control}
                        type="name"
                        error={errors.username}
                        placeholder="User name"
                    />
                    <InputLogin
                        name="email"
                        control={control}
                        type="email"
                        error={errors.email}
                        placeholder="Email"
                    />
                    <InputLogin
                        name="password"
                        control={control}
                        error={errors.password}
                        type="password"
                        placeholder="Password"
                    />
                    <ButtonForm nameButton="Log in" type="submit" />
                </form>
                <footer className="form-footer">
                    <button
                        type="button"
                        className="form-button form-button--forgot"
                        onClick={openModal}
                    >
                        Forgot Password
                    </button>
                    <Modal>{isOpenModal && <ForgotPassword />}</Modal>
                    <div className="form-footer__signup">
                        <p>Are you signed up?</p>
                        <NavLink to={ModuleRoutes.SignUp} className="form-link">
                            Sign up
                        </NavLink>
                    </div>
                </footer>
            </section>
        </div>
    );
};

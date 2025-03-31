// falta test
import { ButtonForm } from "@/pages/components/Form/ButtonForm/ButtonForm";
import { InputForgotPassword } from "@/pages/components/Form/InputForm/InputForgotPassword";
import { PopUpConfirm } from "@/pages/components/Form/PopUpConfirm/PopUpConfirm";
import {
    FormValuesForgotPassword,
    schemaForgotPassword,
} from "@/pages/components/Form/schema/form.schema";
/* import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"; */
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import "./ForgotPassword.css";
import { useState } from "react";
import { useModalContext } from "@/context/Modal/UseModalContext";

export const ForgotPassword = () => {

    const { setIsOpenModal } = useModalContext();
    const [openPopUp, setOpenPopUp] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesForgotPassword>({
        resolver: zodResolver(schemaForgotPassword),
        mode: "onBlur",
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<FormValuesForgotPassword> = () => {
        setOpenPopUp(!openPopUp);
        setTimeout(() => {
            setIsOpenModal(false);
        }, 800);
    };

    return (
        <>
            <section className="form-section form-section--forgotPassword">
                <figure className="form-logo--forgotPassword">
                    {/* usemos import */}
                    <img
                        src="src/assets/logos/logo-shop-main.svg"
                        alt="Logo de la tienda"
                    />
                </figure>
                <h1 className="form__forgotPassword--title">Reset password</h1>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <InputForgotPassword
                        name="email"
                        control={control}
                        type="email"
                        error={errors.email}
                        placeholder="Email"
                    />
                    <ButtonForm type="submit" nameButton="Send" />
                </form>
            </section>
            {openPopUp && (
                <PopUpConfirm
                    message={"The information was sent to the e-mail address entered."}
                />
            )}
        </>
    );
};

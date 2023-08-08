import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";

function Register({ handleRegistred, onChangeInfoTooltip }) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, email } = formValue;
        auth.register(password, email)

            .then((res) => {
                if (res) {
                    try {
                        if (res.status === 200) {
                            console.log(res.status);
                            return res.json();
                        }
                    } catch (e) {
                        console.log(e);
                        return e;
                    }
                    handleRegistred(true); //успешная регистрация
                    onChangeInfoTooltip(); //открытие модального окна
                    navigate("/sign-in", { replace: true }); //переход на другую страницу
                }
            })
            .catch((err) => {
                console.log(err);
                handleRegistred(false); //неудачная регистрация
                onChangeInfoTooltip(); //открытие модальногоокна
            });
        handleRegistred(null);
    };

    return (
        <div className="auth">
            <form
                onSubmit={handleSubmit}
                className="auth__form"
                name="register__form"
            >
                <p className="auth__title">Регистрация</p>

                <fieldset className="auth__fieldset">
                    <input
                        className="auth__input"
                        autoComplete="current-password"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        required
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    <span className="auth__input-error email-error"></span>
                    <input
                        className="auth__input"
                        autoComplete="current-password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        minLength="2"
                        maxLength="200"
                        value={formValue.username}
                        onChange={handleChange}
                    />
                </fieldset>

                <button type="submit" className="auth__btn">
                    Зарегистрироваться
                </button>
                <p className="auth__underForm-description">
                    {"Уже зарегистрировались? "}
                    <Link className="auth__underForm-link" to="/sign-in">
                        {" Войти"}
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;

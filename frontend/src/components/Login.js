import React, { useState } from "react";
import * as auth from "../utils/Auth";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin, handleUserData }) {
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
    const onLogin = (e) => {
        e.preventDefault();
        const { password, email } = formValue;
        if (!email || !password) {
            return;
        }
        auth.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    handleUserData(email);

                    setFormValue({ email: "", password: "" });
                    handleLogin();
                    navigate("/main", { replace: true });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="auth">
            <form onSubmit={onLogin} className="auth__form" name="login__form">
                <p className="auth__title">Вход</p>

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
                        value={formValue.password}
                        onChange={handleChange}
                    />
                </fieldset>

                <button type="submit" className="auth__btn">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;

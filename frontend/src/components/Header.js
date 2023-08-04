import logo from "../images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header(props) {
    let location = useLocation();
    let { email } = props.userData;

    const navigate = useNavigate();

    function onSignOut() {
        localStorage.removeItem("token");
        navigate("/sign-in", { replace: true });
    }

    function changeNavBar(path) {
        if (path === "/sign-in") {
            return (
                <Link className="header__link" to="/sign-up">
                    Регистрация
                </Link>
            );
        } else {
            if (path === "/sign-up") {
                return (
                    <Link
                        className="header__link header__link_logout"
                        to="/sign-in"
                    >
                        Войти
                    </Link>
                );
            } else {
                if (path === "/main") {
                    return (
                        <>
                            <p className="header__link">{email}</p>
                            <button
                                className="header__btn"
                                type="button"
                                aria-label="Выход"
                                onClick={onSignOut}
                            >
                                Выйти
                            </button>
                        </>
                    );
                }
            }
        }
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto" />
            <div className="header__navbar">
                {changeNavBar(location.pathname)}
            </div>
        </header>
    );
}

export default Header;

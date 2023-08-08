import logoGood from "../images/logoGood.svg";
import logoBad from "../images/logoBad.svg";

function InfoTooltip({ isOpen, isRegistred, onClose }) {
    const infoDescriptionGood = "Вы успешно зарегистрировались!";
    const infoDescriptionBad = "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <div className={`popup  ${isOpen ? `popup_opened` : ""} `}>
            <div className="popup__container popup__container_info ">
                <img
                    className="popup__info-logo"
                    src={isRegistred ? logoGood : logoBad}
                    alt={
                        isRegistred
                            ? `Логотип успешной решистрации`
                            : `Логотип ошибки регистрации`
                    }
                />
                <span className="popup__title popup__title_info">
                    {isRegistred ? infoDescriptionGood : infoDescriptionBad}
                </span>
                <button
                    className="popup__btn-close"
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default InfoTooltip;

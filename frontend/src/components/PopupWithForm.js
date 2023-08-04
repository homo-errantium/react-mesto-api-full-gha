import React from "react";

function PopupWithForm(props) {
    // isLoadingMessage(props.isLoading) {
    //     if (isLoading === true) {
    //         this._formElementSubmitButton.textContent = "Сохранение...";
    //     } else {
    //         this._formElementSubmitButton.textContent = "Сохранить";
    //     }
    // }

    return (
        <div
            className={`popup ${props.popupName} ${
                props.isOpen ? `popup_opened` : ""
            }`}
        >
            <div className="popup__container">
                <form
                    onSubmit={props.onSubmit}
                    className="popup__form"
                    name={`${props.formName}`}
                >
                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}

                    <button type="submit" className="popup__btn-save">
                        {props.buttonText || "Сохранить"}
                    </button>
                </form>

                <button
                    className="popup__btn-close"
                    type="button"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    );
}

export default PopupWithForm;

import React from "react";
// import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
    const ref = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: ref.current.value,
        });
    }

    React.useEffect(() => {
        ref.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            popupName="popup_form_avatar"
            isOpen={isOpen}
            onClose={onClose}
            formName="placeData"
            title="Обновить аватар"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <input
                    ref={ref}
                    className="popup__input"
                    id="avatar"
                    type="url"
                    name="url"
                    placeholder="Ссылка на аватар"
                    minLength="2"
                    maxLength="400"
                    required
                />
                <span className="popup__input-error avatar-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;

import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ onUpdateUser, isLoading, isOpen, onClose }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [profileName, setProfileName] = React.useState("");
    const [profileDescription, setProfileDescription] = React.useState("");

    const { name, about } = currentUser;

    function handleNameChange(evt) {
        setProfileName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setProfileDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: profileName,
            about: profileDescription,
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            setProfileName(name);
            setProfileDescription(about);
        }
        // eslint-disable-next-line
    }, [isOpen, currentUser]);
    return (
        <PopupWithForm
            isOpen={isOpen}
            popupName={"popup_form_edit"}
            formName={"profileData"}
            onClose={onClose}
            title={"Редактировать профиль"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <input
                    className="popup__input"
                    id="name"
                    type="text"
                    name="title"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                    value={profileName}
                    onChange={handleNameChange}
                />
                <span className="popup__input-error name-error"></span>
                <input
                    className="popup__input"
                    id="description"
                    type="text"
                    name="subtitle"
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                    value={profileDescription}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__input-error description-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}
export default EditProfilePopup;

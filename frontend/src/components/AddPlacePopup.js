import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            popupName="popup_form_add"
            formName="placeData"
            onClose={onClose}
            title="Новое место"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <input
                    className="popup__input"
                    id="place-name"
                    type="text"
                    name="name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleNameChange}
                    value={name}
                />
                <span className="popup__input-error place-name-error"></span>
                <input
                    className="popup__input"
                    id="place-link"
                    type="url"
                    name="url"
                    placeholder="Ссылка на картинку"
                    required
                    onChange={handleLinkChange}
                    value={link}
                />
                <span className="popup__input-error place-link-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;

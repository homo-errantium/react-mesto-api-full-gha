import React from "react";

function ImagePopup(props) {
    return (
        <div
            className={`popup popup_viewer ${props.card ? "popup_opened" : ""}`}
        >
            <figure className="popup__content">
                <img
                    src={props.card ? props.card.link : ""}
                    alt={props.card ? props.card.name : ""}
                    className="popup__image"
                />
                <figcaption className="popup__description">
                    {props.card ? props.card.name : ""}
                </figcaption>
                <button
                    type="button"
                    className="popup__btn-close"
                    onClick={props.onClose}
                ></button>
            </figure>
        </div>
    );
}
export default ImagePopup;

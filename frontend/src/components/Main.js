import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
            <main className="content">
                <section className="profile">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt={currentUser.name}
                    />
                    <button
                        className="profile__avatar-edit"
                        type="button"
                        title="Обновить аватар"
                        onClick={props.onEditAvatar}
                    ></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__btn-edit"
                            type="button"
                            title="Редактировать профиль"
                            onClick={props.onEditProfile}
                        ></button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__btn-add"
                        type="button"
                        title="Добавить новую фотографию"
                        onClick={props.onAddPlace}
                    ></button>
                </section>

                <section className="elements">
                    {props.cards.map((card) => (
                        <Card
                            onCardLike={props.onCardLike}
                            key={card._id}
                            {...card}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}

export default Main;

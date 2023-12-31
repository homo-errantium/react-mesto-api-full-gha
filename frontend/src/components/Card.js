import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardClick, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.includes(currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__btn-like ${
        isLiked && 'element__btn-like_active'
    }`;

    return (
        <figure className='element'>
            <img
                className='element__image'
                src={card.link}
                alt={card.name}
                title={card.name}
                onClick={handleClick}
            />
            {isOwn && (
                <button
                    className='element__btn-trash'
                    type='button'
                    title='Удалить'
                    onClick={handleDeleteClick}
                ></button>
            )}

            <figcaption className='element__info'>
                <h2 className='element__caption'>{card.name}</h2>
                <div className='element__like-container'>
                    <button
                        onClick={handleLikeClick}
                        className={cardLikeButtonClassName}
                        type='button'
                        title='Нравится'
                    ></button>

                    <p className='element__like-count'>{card.likes.length}</p>
                </div>
            </figcaption>
        </figure>
    );
}

export default Card;

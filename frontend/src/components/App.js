import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import api from '../utils/Api';
import * as auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    /*начальное состояние попапов*/
    const [isEditAvatarPopupOpen, setIsOpenPopupAvatarEdit] =
        React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupFormEdit] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupFormAdd] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    /*начальное состояние пользователя*/
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [isRegistred, setIsRegistred] = React.useState(null);
    const [userData, setUserData] = useState({
        _id: '',
        email: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line
    }, []);

    /*функции изменения состояний сеттеров*/
    function handleInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }

    function handleRegistred(boolean) {
        setIsRegistred(boolean);
    }

    function openPopupAvatarEdit() {
        setIsOpenPopupAvatarEdit(true);
    }

    function handleEditProfileClick() {
        setIsOpenPopupFormEdit(true);
    }

    function openPopupFormAdd() {
        setIsOpenPopupFormAdd(true);
    }

    function openPopupViewer(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsOpenPopupAvatarEdit(false);
        setIsOpenPopupFormEdit(false);
        setIsOpenPopupFormAdd(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(false);
    }

    /*лайк карточки*/
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.includes(currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (!isLiked) {
            api.addCardLike(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        } else {
            api.deleteCardLike(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        }
    }

    /*удаление карточки*/
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((newCard) => {
                const newCards = cards.filter((c) =>
                    c._id === card._id ? '' : newCard
                );
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }
    /*обнвление данных пользователя*/
    function handleUpdateUser(data) {
        setIsLoading(true);
        api.setUserInfo(data)
            .then((newUser) => {
                console.log(newUser);
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }
    /*обновление аватара*/
    function handleUpdateAvatar(data) {
        api.setProfileAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar.data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }
    /*добавление новой крточки*/
    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUserData(email) {
        setUserData({ email: email });
    }

    /*взятие данных с сервера*/
    React.useEffect(() => {
        // const jwt = localStorage.getItem('token');
        isLoggedIn &&
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((err) => console.log(err));
    }, [isLoggedIn]);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    const userData = {
                        _id: res._id,
                        email: res.email,
                    };
                    setUserData(userData);
                    handleLogin();
                    navigate('/main', { replace: true });
                }
            });
        }
    };

    function signOut() {
        localStorage.removeItem('token');
        navigate('/sign-in', { replace: true });
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='root'>
                <div className='page'>
                    <div className='page__container'>
                        <Header
                            signOut={signOut}
                            userData={userData}
                            isLoggedIn={isLoggedIn}
                        />

                        <Routes>
                            <Route
                                path='/'
                                element={
                                    isLoggedIn ? (
                                        <Navigate to='/main' replace />
                                    ) : (
                                        <Navigate to='/sign-in' replace />
                                    )
                                }
                            />
                            {/* роут авторизации */}
                            <Route
                                path='/sign-in'
                                element={
                                    <Login
                                        handleLogin={handleLogin}
                                        handleUserData={handleUserData}
                                    />
                                }
                            />
                            {/* роут регистрации */}
                            <Route
                                path='/sign-up'
                                element={
                                    <Register
                                        handleRegistred={handleRegistred}
                                        onChangeInfoTooltip={handleInfoTooltip}
                                    />
                                }
                            />
                            {/* роут основной страницы */}
                            <Route
                                path='/main'
                                index
                                element={
                                    <>
                                        <ProtectedRoute
                                            isLoggedIn={isLoggedIn}
                                        />
                                        {
                                            <>
                                                <Main
                                                    isLoggedIn={isLoggedIn}
                                                    // старые пропсы
                                                    onCardLike={handleCardLike}
                                                    onCardDelete={
                                                        handleCardDelete
                                                    }
                                                    cards={cards}
                                                    onEditAvatar={
                                                        openPopupAvatarEdit
                                                    }
                                                    onEditProfile={
                                                        handleEditProfileClick
                                                    }
                                                    onAddPlace={
                                                        openPopupFormAdd
                                                    }
                                                    onCardClick={
                                                        openPopupViewer
                                                    }
                                                />

                                                <Footer />

                                                <AddPlacePopup
                                                    isOpen={isAddPlacePopupOpen}
                                                    onClose={closeAllPopups}
                                                    onSubmit={
                                                        handleAddPlaceSubmit
                                                    }
                                                />

                                                <EditAvatarPopup
                                                    isOpen={
                                                        isEditAvatarPopupOpen
                                                    }
                                                    onClose={closeAllPopups}
                                                    onUpdateAvatar={
                                                        handleUpdateAvatar
                                                    }
                                                />

                                                <EditProfilePopup
                                                    isOpen={
                                                        isEditProfilePopupOpen
                                                    }
                                                    onClose={closeAllPopups}
                                                    onUpdateUser={
                                                        handleUpdateUser
                                                    }
                                                    isLoading={isLoading}
                                                />

                                                <ImagePopup
                                                    isOpen={selectedCard}
                                                    card={selectedCard}
                                                    onClose={closeAllPopups}
                                                />
                                            </>
                                        }
                                    </>
                                }
                            />

                            {/* <Route path="*" element={<PageNotFound />} /> */}
                        </Routes>
                        <InfoTooltip
                            isOpen={isInfoTooltipOpen}
                            isRegistred={isRegistred}
                            onClose={closeAllPopups}
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

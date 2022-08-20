import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";
import * as auth from "../utils/Auth";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import iconOk from "../images/ok.svg";
import iconError from "../images/error.svg";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({icon: '', text: ''});

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard

  //Коллбэки кликов по кнопкам
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoToolTipOpen(false);
  };

  //Функция авторизации
  function handleAuthorization(pass, email){
    auth.authorization(pass, email)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      auth.checkToken(data.token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.user.email);
        setCurrentUser(res.user);
        history.push('/');
      })
      .catch(() => {
        setMessage({icon: iconError, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
        setInfoToolTipOpen(true);
      })
    })
    .catch((err) => {
      setMessage({icon: iconError, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      setInfoToolTipOpen(true);
      console.log(err);
    }); 
  }

  //Эффект для проверки токена
  useEffect(() => {
    handleTokenCheck();
  }, [])

  //Функция проверки токена при посещении
  function handleTokenCheck(){
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setEmail(res.user.email);
          setLoggedIn(true);
          setCurrentUser(res.user);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
    }
  }

  //Получаем данные
  useEffect(() => {
    if (loggedIn) {
      api._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
      Promise.all([api.getInfo(), api.getCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo.user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  //Эффект для закрытия попапа ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  //Функция лайка карточки
  function handleCardLike(card){
    const likes = card.likes;
    const check = (element) => element === currentUser._id;
    const isLiked = likes.some(check);
    if (isLiked){
      api.unlikeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === card._id ? newCard.card : currentCard))

      })
      .catch((err) => console.log(err))
    }
    else{
      api.likeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === card._id ? newCard.card : currentCard))
      })
      .catch((err) => console.log(err))
    }
  }

  //Функция удаления карточки
  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))
    })
    .catch((err) => console.log(err))
  }

  //Функция обновления стейта имени
  function handleUpdateUser(userInfo){
    api.patchInfo(userInfo)
    .then((newInfo) => {
      setCurrentUser(newInfo.user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция обновления аватара
  function handleUpdateAvatar(link){
    api.patchAvatar(link)
    .then((newInfo) => {
      setCurrentUser(newInfo.user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  //Функция сохранения карточки
  function handleAddPlaceSubmit(cardInfo){
    api.postCard(cardInfo)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  //Функция регистрации
  function handleRegistration(pass, email){
    auth.registration(pass, email)
    .then((res) => {
      setMessage({icon: iconOk, text: 'Вы успешно зарегистрировались!'});
      history.push('/signin');
      console.log(res);
    })
    .catch(() => {
      setMessage({icon: iconError, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    })
    .finally(() => {
      setInfoToolTipOpen(true);
    })
  }

  //Функция выхода
  function handleSignOut(){
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header 
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignOut}
        />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards ={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/signup">
            <Register
              onRegistration={handleRegistration}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />
          </Route>
          <Route path="/signin">
            <Login 
              onAuthorization={handleAuthorization}
            />
          </Route>
          <Route exact path="*">
          {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
          </Route>
        </Switch>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
        />

        <InfoToolTip
        name="infoToolTip"
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        icon={message.icon}
        text={message.text}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
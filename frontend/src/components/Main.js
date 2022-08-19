import {useContext} from "react";
import Footer from "./Footer.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  //Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__image">
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              className="profile__avatar"
            >
              {" "}
            </div>
            <button
              onClick={props.onEditAvatar}
              className="profile__edit-avatar"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Места">
        {props.cards.map((card) => (
          <Card 
          key={card._id} 
          card={card} 
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete} />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Main;

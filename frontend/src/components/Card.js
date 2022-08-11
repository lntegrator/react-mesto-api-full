import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

function Card({card, onCardClick, onCardLike, onCardDelete }){

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delete ${isOwn ? 'element__delete_active' : ''}`;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeBtnClassName = (`element__button ${
        isLiked && "element__button_active"
    }`);

    function handleCardClick(){
        onCardClick(card);
    }

    function handleLikeClick(){
        onCardLike(card);
    }

    function handleCardDelete(){
        onCardDelete(card);
    }

    return(
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image"  onClick={handleCardClick} />
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <div className="element__place">
                <h3 className="element__name">{card.name}</h3>
                <div className="element__likes">
                    <button className={cardLikeBtnClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-quantity">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card
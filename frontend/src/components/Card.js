import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete, jopa }){
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = `element__delete ${isOwn ? 'element__delete_active' : ''}`;
    const likes = card.likes;
    const check = (element) => element === currentUser._id;
    const isLiked = likes.some(check);
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
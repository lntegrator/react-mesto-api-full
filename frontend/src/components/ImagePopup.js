function ImagePopup({card, onClose}){
    return(
        <div className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}>
            <div className="popup__photo-container">
                <button onClick={onClose} className="popup__button-close"></button>
                <img className="popup__photo" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <p className="popup__caption">{card ? card.name : ''} </p>
                <div onClick={onClose} className="popup__overlay popup__overlay_photo"></div>
            </div>
        </div>
    )
}

export default ImagePopup
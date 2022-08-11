function InfoToolTip({name, onClose, isOpen, icon, text}){
    return(
        <div className={`popup popup_type_${name} ${
            isOpen && "popup_opened"
          }`}>
            <div className="popup__container infoToolTip__container">

                <button
                    onClick={onClose}
                    className="popup__button-close"
                ></button>
                <img src={icon} alt="text" className="infoToolTip__icon"/>
                <p className="infoToolTip__text">{text}</p>
                <div
                    onClick={onClose}
                    className="popup__overlay popup__overlay_profile"
                ></div>
            </div>
        </div>
    )
}

export default InfoToolTip;
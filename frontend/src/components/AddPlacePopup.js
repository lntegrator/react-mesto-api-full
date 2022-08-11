import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace }){

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen])

    function handleChangeTitle(e){
        setTitle(e.target.value);
    }

    function handleChangeLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            title,
            link
        })
    }

    return(
        <PopupWithForm
          isOpen={isOpen}
          title="Новое место"
          name="mesto"
          onClose={onClose}
          buttonText = 'Создать'
          onSubmit={handleSubmit}
        >
          <input
            name="mestoName"
            id="mesto-input"
            type="text"
            className="form__field form__field_type_mesto"
            placeholder="Название"
            value={title}
            required
            minLength="2"
            maxLength="30"
            onChange={handleChangeTitle}
          />
          <span className="form__input-error mesto-input-error"></span>
          <input
            name="mestoLink"
            type="url"
            id="link-input"
            className="form__field form__field_type_link"
            placeholder="Ссылка на картинку"
            value={link}
            required
            onChange={handleChangeLink}
          />
          <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
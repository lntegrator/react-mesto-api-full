import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){

    const linkInput = React.useRef();

    function handleSubmit(e){
        e.preventDefault();
        onUpdateAvatar(linkInput.current.value)
    }

    React.useEffect(() => {
        linkInput.current.value = ""
    }, [isOpen])

    return(
        <PopupWithForm
          isOpen={isOpen}
          title="Обновить аватар"
          name="avatar"
          onClose={onClose}
          buttonText = 'Сохранить'
          onSubmit={handleSubmit}
        >
          <input
            name="avatarLink"
            type="url"
            id="avatar-input"
            className="form__field form__field_type_link"
            placeholder="Вставьте ссылку"
            defaultValue=""
            ref={linkInput}
            required
          />
          <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
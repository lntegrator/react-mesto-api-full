import {useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    //Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    console.log(currentUser)

    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleChangeDescription(e){
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    //Обработчик формы
    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
          isOpen={isOpen}
          title="Редактировать профиль"
          name="profile"
          onClose={onClose}
          buttonText = 'Сохранить'
          onSubmit={handleSubmit}
        >
          <input
            name="personName"
            id="name-input"
            type="text"
            className="form__field form__field_type_name"
            placeholder="Введите имя"
            value={name || ""}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span className="form__input-error name-input-error"></span>
          <input
            name="personDescription"
            id="job-input"
            type="text"
            className="form__field form__field_type_job"
            placeholder="Введите специальность"
            value={description  || ""}
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
          />
          <span className="form__xwinput-error job-input-error"></span>
        </PopupWithForm>
    );
  }
  
  export default EditProfilePopup;
  
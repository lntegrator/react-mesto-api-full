import { useState } from "react";
import { Link, Route } from "react-router-dom";

function Register({ loggedIn, onRegistration }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e){
       setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onRegistration(password, email);
    }

    return(
        <div className="sign">
            <h1 className="sign__title">Регистрация</h1>
            <form className="sign__form" onSubmit={handleSubmit}>
                <input id="email" name="email" type="email" value={email} onChange={handleChangeEmail} className="sign__input" placeholder="Email" required/>
                <input id="password" name="password" type="password" value={password} onChange={handleChangePassword} className="sign__input" placeholder="Пароль" required />
                <div className="sign__buttons">
                    <button className="sign__submit">Зарегистрироваться</button>
                    {
                        <Route path='/signup'>
                            <Link className="sign__link" to='/signin'>Уже зарегистрированы? Войти</Link>
                        </Route>
                    }
                </div>
            </form>
        </div>
    )
}

export default Register;
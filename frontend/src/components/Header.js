import { Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({loggedIn, email, onSignOut}){
    return(
        <header className="header">
          <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
          {loggedIn ? 
            (<div className='header__info'>
              <p className='header__email'>{email}</p>
              <button className='header__sign-out' onClick={onSignOut}>Выйти</button>
            </div>)
            : (<nav>
              <Route path="/sign-in">
                <Link className="header__link" to="/sign-up">Регистрация</Link>
              </Route>
              <Route path="/sign-up">
                <Link className="header__link" to="/sign-in">Вход</Link>
              </Route>
            </nav>)
          }
      </header>
    )
}

export default Header;
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
              <Route path="/signin">
                <Link className="header__link" to="/signup">Регистрация</Link>
              </Route>
              <Route path="/signup">
                <Link className="header__link" to="/signin">Вход</Link>
              </Route>
            </nav>)
          }
      </header>
    )
}

export default Header;
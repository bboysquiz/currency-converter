import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUserId } from '../../store/loginSlice';
import { RootState } from '../../store';
import './Header.css';


const Header: React.FC = () => {
    const logoImg =  require("../../assets/logo.png")
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.login.login);
    const navList = [
        {
            title: 'Конвертация',
            route: '/',
        },
        {
            title: 'Данные пользователей',
            route: '/Data',
        },
        {
            title: 'О сайте',
            route: '/About',
        }
    ]
    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem('isLogin', 'false')
        localStorage.setItem('userId', '-1')
        dispatch(setLogout());
        dispatch(setUserId(-1))
    }
    return (
        <header className='header'>
            <div className="header__container">
                <img src={logoImg} alt="logo" className="header__logo" />
                <nav className="header__nav">
                    <ul className="header__ul">
                        {
                            navList.map((el, index) => (
                                <li key={index} className='header__li'><Link to={el.route} className="">{el.title}</Link></li>
                            ))
                        }
                        {
                            isLogin !== true && (
                                <li className='header__li'><Link to='/SignIn' className="">Авторизация</Link></li>
                            )
                        }
                    </ul>
                </nav>
                {
                    isLogin === true && (
                        <button className="header__logout-button" onClick={handleLogout}>Logout</button>
                    )
                }
            </div>

        </header>
    )
}

export default Header
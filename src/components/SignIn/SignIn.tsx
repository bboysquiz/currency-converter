import { useState } from 'react';
import { setLogin, setUserId } from '../../store/loginSlice';
import { useDispatch, useSelector } from "react-redux";
import data from '../../db.json';
import { RootState } from '../../store';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [redirectToMain, setRedirectToMain] = useState(false);

    if (redirectToMain) {
        navigate('/');
    }
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();

    const isLogin = useSelector((state: RootState) => state.login.login);

    const { users: usersById } = data;
    const users = Object.values(usersById);

    function findUser(login: string) {
        return users.find(user => user.login === login);
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    function checkPassword(user: { password: string }, password: string) {
        return user.password === password;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const user = findUser(username);

        if (!user) {
            alert('User not found');
            return;
        }

        const isPasswordCorrect = checkPassword(user, password);

        if (!isPasswordCorrect) {
            alert('This password is not correct');
            return;
        }
        localStorage.setItem('isLogin', 'true')
        localStorage.setItem('userId', user.id.toString())
        dispatch(setLogin());
        dispatch(setUserId(user.id));
        setRedirectToMain(true)
    }



    return (
        <section className='signin'>
            <Header />
            <div className="signin__container">
                {
                    isLogin !== true && (
                        <div className='signin__wrapper'>
                            <h2 className='signin__title'>Авторизация</h2>
                            <form className='signin__form' onSubmit={handleSubmit}>
                                <div className='signin__input-wrapper'>
                                    <label className='signin__username-label' htmlFor="username-input">Username</label>
                                    <input className='signin__input' id="username-input" type="text" value={username} onChange={handleUsernameChange} />
                                </div>
                                <div className='signin__input-wrapper'>
                                    <label className='signin__password-label' htmlFor="password-input">Password</label>
                                    <input className='signin__input' id="password-input" type="password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <button className='signin__button' type="submit">Login</button>
                            </form>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default SignIn
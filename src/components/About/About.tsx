import Header from "../Header/Header"
import './About.css'

const About = () => {
  return (
    <section className="about">
      <Header />
      <div className="about__container">
        <div className="about__wrapper">
          <p className="about__text">
             Добро пожаловать на мой сайт!
          </p>
          <p className="about__text">
            Этот сайт является проектом для моего портфолио, 
            где я демонстрирую свои навыки в различных технологиях. 
            Здесь я использовал стек технологий, включающий React, Router DOM, Axios, Redux Toolkit, Redux Thunk и Typescript.
          </p>
          <p className="about__text">
            Вы можете ознакомиться с кодом приложения на моей странице GitHub: https://github.com/bboysquiz/currency-converter.
            </p>
          <p className="about__text">
            На этом сайте вы можете конвертировать валюты. 
            Зарегистрированные пользователи имеют возможность 
            просматривать историю своих конвертаций и подписываться на изменение цены 
            определенной валюты, чтобы своевременно продать ее.
          </p>
          <p className="about__text">
            Важно отметить, что этот проект демонстрирует только фронтенд-часть моих навыков, 
            и база данных эмулируется с помощью файла db.json.
          </p>
          <p className="about__text">
            Для авторизации на сайте перейдите на страницу "Данные пользователей" 
            и используйте любые доступные данные для входа, так как регистрация на сайте недоступна.
          </p>
          <p className="about__text">
            Благодарю за посещение моего сайта и надеюсь, что вам понравится его функциональность и дизайн. 
            Если у вас есть вопросы или предложения, не стесняйтесь связаться со мной.
          </p>
          <p className="about__text">
            Желаю приятного пользования!
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
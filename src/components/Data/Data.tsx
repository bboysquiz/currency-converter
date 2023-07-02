import Header from "../Header/Header"
import data from '../../db.json';
import './Data.css'

const Data = () => {
  const { users: usersById } = data
  const users = Object.values(usersById)
  return (
    <section className="data">
      <Header />
      <div className="data__container">
        <h1 className="data__title">Данные пользователей</h1>
        <div className="data__wrapper">
          <ul className="data__ul">
            {
              users.map((el) => (
                <li className="data__list-item">
                  <p className="data__text">Name: <span className="data__text-data">{el.name}</span></p>
                  <p className="data__text">Login: <span className="data__text-data">{el.login}</span></p>
                  <p className="data__text">Password: <span className="data__text-data">{el.password}</span></p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Data
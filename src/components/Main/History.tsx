import { RootState, AppDispatch } from '../../store/index';
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { clearHistory, subscribe, unsubscribe, addToHistory, deleteNote } from '../../store/historySlice';
import './Main.css'


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


const History: React.FC = () => {

  const history = useTypedSelector((state) => state.history.history);
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector((state: RootState) => state.login.login); //состояние авторизации пользователя  
  const userId = useSelector((state: RootState) => state.login.userId)
  const handleClearHistory = () => {
    dispatch(clearHistory(userId));
  }

  const handleSubscribe = async (index: number) => {
    history.forEach((item, i) => {
      if (i === index) {
        if (item.notifyAmount !== '' && item.notifyDirection !== '') {
          dispatch(subscribe(index));
        }
      }
    });
  };

  const handleUnsubscribe = (index: number) => {
    dispatch(unsubscribe(index));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id))
  }



  return (
    <section className='history'>
      {
        localStorage.getItem('isLogin') === 'true' && (
          <div className='history__container'>
            <h2 className='history__title'>Converting history</h2>
            <ul className='history__ul'>
              {
                history.length >= 1 && isLogin === true &&
                history.map((el, indexItem) => (
                  el.userId === userId && (
                    <li className={`history__list-item ${el.subscribed ? 'history__list-item_subscribed' : ''}`} key={indexItem}>
                      <div className='history__note'>
                        {el.date} <br />
                        <span className="history__data-span">{el.amount} {el.fromCurrency}</span> переведено в <span className="history__data-span">{el.convertedAmount} {el.toCurrency}</span>
                      </div>
                      <div className='history__subscribing-wrapper'>
                        <div className="history__subscribing-text">
                          <label className='history__subscribing-label' htmlFor="notifyAmount">Уведомить меня, если сумма изменится на:</label>
                          <input
                            className='history__input'
                            type="text"
                            id="notifyAmount"
                            value={el.notifyAmount}
                            onChange={(event) => {
                              const value = event.target.value;
                              const updatedHistory = history.map((item, i) => {
                                if (i === indexItem) {
                                  return {
                                    ...item,
                                    notifyAmount: value
                                  };
                                }
                                return item
                              });
                              dispatch(addToHistory(updatedHistory[indexItem]))
                            }
                              //записывать value в el.notifyAmount
                            }
                          />
                          <br />
                          <label className='history__subscribing-label' htmlFor="notifyDirection">Направление:</label>
                          <select
                            className='history__select'
                            id="notifyDirection"
                            value={el.notifyDirection}
                            onChange={(event) => {
                              const value = event.target.value;
                              const updatedHistory = history.map((item, i) => {
                                if (i === indexItem) {
                                  return {
                                    ...item,
                                    notifyDirection: value
                                  };
                                }
                                return item
                              });
                              dispatch(addToHistory(updatedHistory[indexItem]))
                            }
                              //записывать value в el.notifyDirection
                            }
                          >
                            <option value="">Выберите направление</option>
                            <option value="increase">В большую сторону</option>
                            <option value="decrease">В меньшую сторону</option>
                          </select>
                        </div>
                        <div className="history__subsribing-buttons">
                          <button className='history__button history__button-subscribe' onClick={() => handleSubscribe(indexItem)}>Подписаться на уведомления</button>
                          <button className='history__button history__button-unsubscribe' onClick={() => handleUnsubscribe(indexItem)}>Отписаться от уведомлений</button>
                          <button className='history__button history__button-delete' onClick={() => handleDelete(el.id)}>Удалить</button>
                        </div>
                      </div>

                    </li>
                  )
                ))
              }
            </ul>
            
              <button className='history__button history__button-delete-all' onClick={handleClearHistory}>Clear history</button>
          </div>
        )
      }
    </section>
  )
}

export default History
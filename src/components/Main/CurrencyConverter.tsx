import { useState, useEffect } from 'react';
import axios from 'axios';
import History from './History';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { addToHistory } from '../../store/historySlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const CurrencyConverter: React.FC = () => {


    const dispatch = useDispatch();

    const [amount, setAmount] = useState<number | string>(0) //количество исходной валюты
    const [convertedAmount, setConvertedAmount] = useState<number | string>(0) //итоговое количество сконвертированной валюты
    const [fromCurrency, setFromCurrency] = useState<string>('EUR') //наименование исходной валюты
    const [toCurrency, setToCurrency] = useState<string>('USD') //наименование целевой валюты
    const userId = useTypedSelector((state) => state.login.userId)

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.trim(); // Удаление пробелов по краям строки
        const parsedValue = parseFloat(inputValue);

        if (isNaN(parsedValue)) {
            setAmount(''); // Установка значения 0, если введенное значение не является числом
        } else {
            setAmount(parsedValue); // Установка введенного числового значения
        }
    }

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(event.target.value)
    }

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.target.value)
    }
    useEffect(() => {
        if (fromCurrency === toCurrency) {
            setConvertedAmount('');
        } else {
            setConvertedAmount(0)
        }
    }, [fromCurrency, toCurrency])



    const handleConvertClick = async () => {
        if (fromCurrency !== toCurrency) {
            try {
                const response = await axios.get(
                    'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                    {
                        headers: {
                            'x-rapidapi-host': 'currency-converter-by-api-ninjas.p.rapidapi.com',
                            'x-rapidapi-key': 'e9ec7b6b68msh56974fcca61250fp18281cjsn7dcd57724cfc',
                        },
                        params: {
                            have: fromCurrency,
                            want: toCurrency,
                            amount: amount,
                        },
                    }
                )
                setConvertedAmount(response.data.new_amount)
                const date = new Date(Date.now());
                const formattedDate = date.toLocaleString();

                dispatch(addToHistory({
                    id: uuidv4(),
                    amount: Number(amount),
                    convertedAmount: response.data.new_amount,
                    fromCurrency,
                    toCurrency,
                    date: formattedDate,
                    notifyAmount: '',
                    notifyDirection: '',
                    subscribed: false,
                    intervalId: null,
                    userId: userId,
                }))
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('Currencies should be different')
        }
    }

    return (
        <section className="currency-converter">
            <div className="currency-converter__container">
                <h1 className='currency-converter__title'>Currency Converter</h1>
                <div className="currency-converter__nomenclature">
                    <select className='currency-converter__nomenclature-select' value={fromCurrency} onChange={handleFromCurrencyChange}>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
                        <option value="RUB">RUB</option>
                        <option value="GBP">GBP</option>
                    </select>
                    <select className='currency-converter__nomenclature-select' value={toCurrency} onChange={handleToCurrencyChange}>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
                        <option value="RUB">RUB</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div className="currency-converter__amount-wrapper">
                    <div className='currency-converter__amount'>
                        <label>From</label>
                        <input className="currency-converter__amount-input" type="text" value={amount} onChange={handleAmountChange} />
                    </div>
                    <div className='currency-converter__amount'>
                        <label>To</label>
                        <input className="currency-converter__amount-input" type="text" value={typeof convertedAmount === 'number' ? convertedAmount.toFixed(2) : ''} readOnly />
                    </div>
                </div>
                <button className="currency-converter__button" onClick={handleConvertClick}>Рассчитать стоимость</button>
                <History />
            </div>
        </section>
    );
};
export default CurrencyConverter;
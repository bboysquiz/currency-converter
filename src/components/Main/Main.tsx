import React from 'react'
import CurrencyConverter from './CurrencyConverter';
import Header from '../../components/Header/Header';
import './Main.css'

const Main: React.FC = () => {
  return (
    <div>
        <Header />
        <CurrencyConverter data-testid="currency-converter"/>
    </div>
  )
}

export default Main
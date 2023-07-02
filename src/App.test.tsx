import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store'; 
import App from './App';
import '@testing-library/jest-dom/extend-expect'; 

test('Отображение компонентов CurrencyConverter и SignIn', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const currencyConverterComponent = screen.getByTestId('currency-converter');
  const signInComponent = screen.getByTestId('sign-in');

  expect(currencyConverterComponent).toBeInTheDocument();
  expect(signInComponent).toBeInTheDocument();
});

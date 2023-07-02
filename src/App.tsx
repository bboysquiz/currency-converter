import Main from './components/Main/Main'
import SignIn from './components/SignIn/SignIn';
import Data from './components/Data/Data';
import About from './components/About/About';

import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<Main />} /> 
        <Route path='SignIn' element={<SignIn />} />
        <Route path='Data' element={<Data />} />
        <Route path='About' element={<About />} />
      </Routes>
    </div>
  );
};

export default App;

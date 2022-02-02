import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);// тут проверяют логин

  useEffect(()=>{
     const storedUserloggedInfo = localStorage.getItem('isLoggetIn'); //тут получаем наши данные
     if(storedUserloggedInfo === '1') {
       setIsLoggedIn(true)//если storedUserloggedInfo равен  одному то тогда setIsLoggedIn(true)
     }
  }, [])// как мы знаем useEffect принимает два аргумента callback и пустой массив. Пустой массив нужен для того чтобы снова и снова не рендерится,только один раз

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
  
    setIsLoggedIn(true);// тут значение true
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn')
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />} 
        {/* если false тогда не будет отображаться */}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {/* если внутри функции loginHandler  setIsLoggedIn() true тогда в Home рендерится */}
      </main>
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import { Redirect } from 'react-router-dom';

import "../../../assets/scss/profile.scss"

const Home = () => {
  return (
    <div className='home section'>
      <div className="banner">
        <h1 className="banner-child white-font">¡Bienvenido a Walletify!</h1>
        <br></br>
        <h3 className="banner-child white-font">¡Estate atento, esto recien empieza!</h3>
      </div>
    </div>
  );
}

export default Home
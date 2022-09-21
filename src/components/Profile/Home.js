import React from 'react';
import "../../assets/scss/profile.scss"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { auth } from '../../firebase';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='home'>
      <div className="child">
        <h1 className="white-font">¡Bienvenido a Walletify, {currentUser.displayName}!</h1>
        <br></br>
        <h3 className="white-font">¡Estate atento, esto recien empieza!</h3>
      </div>
    </div>
  );
}

export default Home
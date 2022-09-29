import React from 'react';
import "../../assets/scss/profile.scss"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { auth } from '../../firebase';
import MoneyManager from '../MoneyManager';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <MoneyManager/>
  );
}

export default Home
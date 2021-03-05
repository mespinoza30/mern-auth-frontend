// Imports
import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Welcome from './components/Welcome';

const PrivateRoute = ({ component: component, ...rest}) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a private Route');
  return <Route {...rest} render={(props) => {
    //check to see if there is a token, hit the compenent it available if there is a token, if not redirect to login
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>
  }} /> 
}

function App() {
  // Set state values

  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setisAuthenticated(false);
      console.log('==> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setisAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      //remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setisAuthenticated(false);
    }
  }

  return (
    <div className="App">
      <h1>MERN Authentication</h1>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
    </div>
  );
}

export default App;
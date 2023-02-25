import React, { Component } from 'react';
import './App.css'
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm'
import PageNotFound from '../Pages/PageNotFound';
import { useState,useEffect } from 'react';
import Protected from '../../util/Protected';
import Account from '../Account/Account';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import AppLoader from '../../util/loaders/AppLoader'

function searchYelp(term, location, sortBy) {
    console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
}

const App = () => {
    // getting auth state from redux store
    /*
        useSelector to retrieve loadded property from authSlice
        useDispatch to displat login action from authSlice
    */
    const { loaded } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
      if (!loaded) {
        /*
         If the page is not loaded, wait for 2 secs (loading gif) then dispatch login
         the login action from authSlice will turn the loaded state to true to make the page appear
        */
        const user = JSON.parse(localStorage.getItem('user'));
        setTimeout(() => {
          dispatch(login({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            avatar: ''
          }))
        }, 2000)
      }
    })
  
    return (
      <div className="App">
        {!loaded && <AppLoader />}
        <Navigation />
        <h1 style={{ margin: 0 }}>ravenous</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    );
  };
  
  export default App;



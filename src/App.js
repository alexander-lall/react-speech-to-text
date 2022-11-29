import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import About from './pages/about/about.component';
import Contact from './pages/contact/contact.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { createStructuredSelector } from 'reselect';

import './App.css';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className='main-page'>
        <Header />
        <Routes>
          <Route path='/' element={ currentUser ? <HomePage/> : <SignInAndSignUpPage/> } /> 
          <Route path='/about' element={ <About/> } />
          <Route path='/contact' element={ <Contact/> } />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

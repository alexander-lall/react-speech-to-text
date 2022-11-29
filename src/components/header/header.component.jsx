import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = ({ currentUser }) => {
    return (
        <div className='header'>
            <div className='nav-bar'>
                <Link className='logo-container' to='/'>
                    <h2>DEVEMORCE</h2>
                </Link>
                <div className='options'>
                    <Link className='option' to='/about-us'>
                        ABOUT US
                    </Link>
                    <Link className='option' to='/contact'>
                        CONTACT
                    </Link>
                    {
                        currentUser ? (
                            <div className='option' onClick={() => signOut(auth)}>
                                SIGN OUT
                            </div>
                        ) : (
                            <Link className='option' to='/'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css'
import { NavLink } from 'react-router-dom';
import title from "./title.svg"

function Auth() {
    const user = useSelector(state => state.session.user);
    const notUser = !user;

    return (<>
        {!user && (< div id="auth" >
            <img src={title} id="a" />
            <div className="auth-forms" id='b'>
                <SignUpForm />
            </div>
            <div id='grid-gap'></div>
            <div className="auth-forms" id='d'>
                <LoginForm />
            </div>
        </div >)}
    </>)
}


export default Auth;

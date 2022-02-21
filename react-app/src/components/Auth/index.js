import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css'

function Auth() {
    const user = useSelector(state => state.session.user);

    return (
        <div id="auth">
            <div className="auth-forms" id='b'>
                <SignUpForm />
            </div>
            {!user && <div id='grid-gap'></div>}
            <div className="auth-forms" id='d'>
                <LoginForm />
            </div>
        </div >)

}

export default Auth;

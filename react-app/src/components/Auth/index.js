import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css'

function Auth() {
    return (
        <div id="auth">

            <div className="auth-forms" id='b'>
                <SignUpForm />
            </div>
            <div id='grid-gap'></div>
            <div className="auth-forms" id='d'>
                <LoginForm />
            </div>

        </div>
    )
}

export default Auth;

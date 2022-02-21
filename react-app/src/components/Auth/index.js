import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css'

function Auth() {
    return (
        <div id="auth">
            <div className=''>
                <SignUpForm />
            </div>
            <div className=''>
                <LoginForm />
            </div>
        </div>
    )
}

export default Auth;

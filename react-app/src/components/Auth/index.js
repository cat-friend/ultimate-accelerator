import React from 'react';
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css'
import title from "./title.svg"

function Auth() {
    const user = useSelector(state => state.session.user);

    return (<>
        {!user && (< div id="auth" >
            <img src={title} id="a" alt="Ultimate Accelerator title"/>
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

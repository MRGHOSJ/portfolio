import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithPopup, isAuthenticated} = useAuth0()

  return (
    !isAuthenticated && (
        <div className="loginContainer">
            <div className="loginTop"></div>
            <div className="loginBottom"></div>
            <div className="loginCenter">
            <h2>&nbsp;</h2>
                <h2>Please Sign In</h2><button onClick={() => loginWithPopup()}>Sign in</button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    )
  )
}

export default LoginButton
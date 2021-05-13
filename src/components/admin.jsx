import React from 'react'
import LoginButton from './buttons/LoginButton'
import Dashboard from './dashboard/dashboard'
import { useAuth0 } from '@auth0/auth0-react'

function Admin () {
    const { isLoading } = useAuth0();

    if (isLoading) return (
      <div id="preloader"></div>
    )
  
    return (
      <div>
        <LoginButton />
        <Dashboard />
      </div>
    );
}

export default Admin
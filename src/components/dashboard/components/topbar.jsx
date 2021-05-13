import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Topbar = () => {

    const { logout, user } = useAuth0()

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.email}</span>
                        <img className="img-profile rounded-circle"
                            src={user.picture}/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="nav-link collapsed dropdown-item"
                            aria-expanded="true" aria-controls="collapseUtilities" onClick={() => logout()} >
                            <i className="material-icons icon">logout</i>
                            <span>Log out</span>
                        </a>
                    </div>
                </li>

            </ul>

        </nav>
    )
}

export default Topbar
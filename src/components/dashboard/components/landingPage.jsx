import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {

    const { user } = useAuth0()

  return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                <div className="row dashbord-contact">
                    <div className="col-lg-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="col-auto">
                                        <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon">home</i>
                                </div>
                                <div className="card-body">
                                <div className="col mr-2">
                                        <h1 className="h3 mb-0 text-gray-800">Welcome, {user.name}</h1>
                                        <br/>
                                        <p>This dashboard will help you customise your website to be better looking. Also you would be able to upload, edit and delete content when ever you want here !</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">How does it work?</h6>
                                </div>
                                <div className="card-body">
                                    <p>
                                        If you want to change something in the interface just select one of the categories you would like to modify and start editing them as you wish!
                                    </p>
                                    <p className="mb-0">
                                        And if you want to change any of the colors or the logo / name of the app check out the user interface!
                                    </p>
                                </div>
                            </div>

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Need Assistance? Contact Me</h6>
                                </div>
                                <div className="card-body">
                                    <div className="socials">
                                        <ul>
                                            <li>
                                                <a
                                                href="https://www.facebook.com/profile.php?id=100014414821451"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                >
                                                <span className="ico-circle">
                                                    <i className="ion-social-facebook"></i>
                                                </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                href="https://github.com/MRGHOSJ"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                >
                                                <span className="ico-circle">
                                                    <i className="ion-social-github"></i>
                                                </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                href="https://twitter.com/bouzouitayassi2"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                >
                                                <span className="ico-circle">
                                                    <i className="ion-social-twitter"></i>
                                                </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                </div>
            </div>
  )
}

export default LandingPage
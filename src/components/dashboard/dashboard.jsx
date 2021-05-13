import React, { useState }  from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Sidebar from './components/sidebar'
import Topbar from './components/topbar'
import LandingPage from './components/landingPage'
import Home from './components/interface/home'
import About from './components/interface/about'
import Gallery from './components/interface/gallery'
import Contact from './components/interface/contact'
import Settings from './components/userInterface/settings'
import Requests from './components/userInterface/requests'

const Dashboard = () => {
  const { isAuthenticated } = useAuth0()
  const [page, setPage] = useState('landingPage');

  const chosenCategory = (category) => {
    setPage(category)
  } 

  return (
    isAuthenticated && (
        <div id="wrapper">
            <Sidebar chosenCategory={chosenCategory} activeCategory={page}/>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar/>
                
                {
                  page == 'landingPage' && (<LandingPage/>) ||
                  page == 'home' && (<Home/>) ||
                  page == 'about' && (<About/>) ||
                  page == 'gallery' && (<Gallery/>) ||
                  page == 'contact' && (<Contact/>) ||
                  page == 'settings' && (<Settings/>) ||
                  page == 'request' && (<Requests/>)
                }
              </div> 
            </div>
        </div>
    )
  )
}

export default Dashboard
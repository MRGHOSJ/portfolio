import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import firebase from './firebase';

//import css in order
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import './img/icons/css/ionicons.css';
import './img/font-awesome/css/font-awesome.css';
import 'lightbox2/dist/css/lightbox.min.css'
import './style.css';
import './dashboard.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

//import js libraries
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './libs/easing.js';
import 'lightbox2/dist/js/lightbox.min.js';

import Main from './main'
import App_Tittle from './app_title'

import * as serviceWorker from './serviceWorker';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

firebase.database().ref('category').once("value", snapshot => {
  if (!snapshot.exists()){
    let newHome = firebase.database().ref('category').child("home")
    let newAboust = firebase.database().ref('category').child("about")
    let newContact = firebase.database().ref('category').child("contact")
    newHome.set({
        tittle:"Hello, I am Hunain!",
        list:["Graphics Designer",
        "Web Developer",
        "Video Editor"]
    })
    newAboust.set({
      picture:"https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
      text:"text here"
    })
    newContact.set({
      tittle1:"Send A Message",
      tittle2:"Get in Touch",
      text:"Whether you want to get in touch, talk about a project collaboration, or just say hi, I'd love to hear from you.Simply fill the from and send me an email.",
      contacts:[
        {
          icon:"facebook",
          url:"https://facebook.com"
        },
      ]
    })
  }
});

firebase.database().ref('app').once("value", snapshot => {
  if (!snapshot.exists()){
    let appTitle = firebase.database().ref('app').child("title")
    let appLogo = firebase.database().ref('app').child("logo")
    let appColors = firebase.database().ref('app').child("colors")
    appTitle.set("Hunain")
    appLogo.set("https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png")
    appColors.set({
      primary_color:"#171717",
      secondary_color:"#FEE715"
    })
  }
});


ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    redirectUri={window.location.origin}
  >
    <App_Tittle/>
    <Main/>
  </Auth0Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

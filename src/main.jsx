import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from './firebase'

//import components
import Navbar from './components/navbar.jsx';
import Intro from './components/intro.jsx';
import About from './components/about.jsx';
import Portfolio from './components/portfolio.jsx';
import Contact from './components/contact.jsx';
import BackToTop from './components/back-top.jsx';
import Admin from './components/admin'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false
        };
      }

    componentDidMount(){
        firebase.database().ref('loading').once("value", snapshot => {
            this.setState({loading:snapshot.val()})
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.loading ? (<Router>
                        <Route exact path="/">
                            <Navbar />
                            <Intro />
                            <About />
                            <Portfolio />
                            <Contact />
                            <BackToTop />
                        </Route>
                        <Route path="/admin">
                        <Admin/>
                        </Route>
                    </Router>):(<div id="preloader"></div>)
                }
                
            </div>
        )
        
    }

}

export default Main
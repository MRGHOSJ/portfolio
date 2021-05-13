import React from 'react'
import $ from 'jquery'
import firebase from './firebase';


const ref = firebase.database().ref('app')

class App_Tittle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          title:"",
          logo:"",
          colors:[]
        };
    }

    componentDidMount(){
        ref.on("value",(snapshot)=>{
            if(snapshot.exists()){
                this.setState({title:snapshot.val().title})
                this.setState({logo:snapshot.val().logo})
                this.setState({colors:Object.values(snapshot.val().colors)})
                document.title = this.state.title
                document.documentElement.style.setProperty('--primary_color', this.state.colors[0]);
                document.documentElement.style.setProperty('--secondary_color', this.state.colors[1]);
                $("#webLogo").attr("href",this.state.logo);
            }
        })
        ref.on("child_changed",(snapshot)=>{
            if(snapshot.exists()){
                this.setState({title:snapshot.val().title})
                this.setState({logo:snapshot.val().logo})
                this.setState({colors:snapshot.val().colors})
                document.title = this.state.title
                $("#webLogo").attr("href",this.state.logo);
            }
        })
    }

    render(){
        return <div></div>
    }


}



export default App_Tittle

import React from "react";
import imageOverlay from "../img/earth.jpg";
import firebase , { storage } from '../firebase'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("category").child("contact")

let requestsRef = db.ref("requests")

const makeid = (length) => {
  let result           = [];
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        social:[],
        title1:"",
        title2:"",
        text:"",
        message_name:'',
        message_email:'',
        message_subject:'',
        message_content:'',
        message_file:'',
        fileName:''
      };
  }

  componentDidMount(){
    ref.child("contacts").once("value", snapshot => {
      if(!snapshot.exists()) return
      this.setState({social:snapshot.val()})
    })
    ref.once("value", snapshot => {
      this.setState({text:snapshot.val().text})
      this.setState({title1:snapshot.val().tittle1})
      this.setState({title2:snapshot.val().tittle2})
    })
  }


  sendMessage(){
    let message_name = this.state.message_name
    let message_email = this.state.message_email
    let message_subject = this.state.message_subject
    let message_content = this.state.message_content
    let message_file = this.state.message_file

    if(message_name == '' || message_email == '' || message_subject == '' || message_content == ''){
      toast.error('You have to fill all of the inputs!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
    }

    if (validateEmail(message_email)){

      if(message_file != ''){

        let id = makeid(20)
  
        let key = ""
  
        requestsRef.push({
          imageId:id,
          stats:'pending',
          name: message_name,
          email: message_email,
          subject: message_subject,
          content: message_content,
          message_file: ""
        }).then(snapshot=>{
          key = snapshot.key
        })
  
        let uploadFile = storage.ref(`requests`).child(id).put(message_file)
  
        uploadFile.on("state_changed",snapshot=>{},error=>{console.log(error)},()=>{
          storage.ref("requests").child(id).getDownloadURL().then(url=>{
            requestsRef.child(key).update({
              message_file: url
            })
          })
        })
  
      }else{
        requestsRef.push({
          id:'',
          stats:'pending',
          name: message_name,
          email: message_email,
          subject: message_subject,
          content: message_content,
          message_file: ""
        })
      }
  
      toast.success('Message was successfully sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
  
      this.setState({
        message_name:'',
        message_email:'',
        message_subject:'',
        message_content:'',
        message_file:'',
        fileName:''
      })
  
    }else{
      toast.error("Email is not a valid email address!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
    }

  }

  handleFileChange(e){
    this.setState({fileName:e.target.value})
    if(e.target.files[0]){
      this.setState({message_file:e.target.files[0]}) 
    }
  }

  render() {
    return (
      <section
        className="paralax-mf footer-paralax bg-image sect-mt4 route"
        style={{ backgroundImage: "url(" + imageOverlay + ")" }}
      >
      <ToastContainer/>
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row contact">
            <div className="col-sm-12">
              <div className="contact-mf">
                <div id="contact" className="box-shadow-full">
                  <div className="row" >
                    <div className="col-md-6">
                      <div className="title-box-2">
                        <h5 className="title-left">{this.state.title1}</h5>
                      </div>
                      <div>
                        <div
                          className="contactForm"
                        >
                          <div id="errormessage"></div>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="name"
                                  placeholder="Your Name"
                                  data-rule="minlen:4"
                                  data-msg="Please enter at least 4 chars"
                                  value={this.state.message_name}
                                  onChange={(e)=>{this.setState({message_name:e.target.value})}}
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Your Email"
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                  value={this.state.message_email}
                                  onChange={(e)=>{this.setState({message_email:e.target.value})}}
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="subject"
                                  id="subject"
                                  placeholder="Subject"
                                  data-rule="minlen:4"
                                  data-msg="Please enter at least 8 chars of subject"
                                  value={this.state.message_subject}
                                  onChange={(e)=>{this.setState({message_subject:e.target.value})}}
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  name="message"
                                  rows="5"
                                  data-rule="required"
                                  data-msg="Please write something for us"
                                  placeholder="Message"
                                  value={this.state.message_content}
                                  onChange={(e)=>{this.setState({message_content:e.target.value})}}
                                ></textarea>
                                <div className="validation"></div>
                              </div>
                            </div>
                            
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="file"
                                  value={this.state.fileName}
                                  onChange={(e)=>this.handleFileChange(e)}/>
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button
                                className="button button-a button-big button-rouded"
                                onClick={()=>this.sendMessage()}
                              >
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="title-box-2 pt-4 pt-md-0">
                        <h5 className="title-left">{this.state.title2}</h5>
                      </div>
                      <div className="more-info">
                        <p className="lead">
                          {this.state.text}
                        </p>
                      </div>
                      <div className="socials">
                        <ul>
                          {
                            this.state.social.map(social => {
                              return(
                                <li>
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span className="ico-circle">
                                    <i className={"ion-social-"+social.icon}></i>
                                  </span>
                                </a>
                              </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;

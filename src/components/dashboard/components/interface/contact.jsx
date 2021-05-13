import React from 'react';
import firebase from '../../../../firebase'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("category/contact")


class Contact extends React.Component  {

  constructor(props) {
      super(props);
      this.state = {
          text:"",
          tittle1:"",
          tittle2:"",
          contacts:[],
          supported_Social:[
            "android",
            "angular",
            "apple",
            "bitcoin",
            "codepen",
            "css3",
            "dropbox",
            "facebook",
            "foursquare",
            "google",
            "github",
            "instagram",
            "javascript",
            "html5",
            "linkedin",
            "pinterest",
            "reddit",
            "sass",
            "snapchat",
            "skype",
            "tumblr",
            "twitter",
            "vimeo",
            "twitch",
            "whatsapp",
            "wordpress",
            "yahoo",
            "youtube",
          ]
      };
  }

  componentDidMount(){
      ref.once("value", snapshot => {
        let value = snapshot.val()

        if(value.text) this.setState({text:value.text})
        if(value.tittle1) this.setState({tittle1:value.tittle1})
        if(value.tittle2) this.setState({tittle2:value.tittle2})
        if(value.contacts) this.setState({contacts:value.contacts})
          
      })
  }

  handleSelectSocial(id,value){
    let contacts = this.state.contacts

    contacts[id].icon = value

    this.setState(contacts)
  }

  handleUrlSocial(id,value){
    let contacts = this.state.contacts

    contacts[id].url = value

    this.setState(contacts)
  }

  editContact(){
      let contacts = this.state.contacts

      ref.child("contacts").set(contacts)
      toast.success('Social was successfully updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
  }

  addContact(){
    let contacts = this.state.contacts

    contacts.push({
      icon:"android",
      url:""
    })

    this.setState(contacts)
  }

  deleteContact(id){
    let contacts = this.state.contacts

    contacts.splice(id,1)

    this.setState(contacts)

  }

  render(){

      let saveText = () => {
          ref.update({
            text: this.state.text,
          })
          toast.success('New text is successfully saved!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      }

      let saveTitles = () => {
          ref.update({
            tittle1: this.state.tittle1,
            tittle2: this.state.tittle2
          })
          toast.success('New titles are successfully saved!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      }

      return (
          <div className="container-fluid">
              <ToastContainer/>
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Contact</h1>
              </div>
              <div className="row">
                  <div className="col-xl-7 mb-4">
                      <div className="card border-bottom-primary shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                          Titles</div>
                                          <br/>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          <input type="text" className="form-control bg-light border-0" placeholder="Picture url..."
                                           aria-label="Search" aria-describedby="basic-addon2" 
                                           value={this.state.tittle1} onChange={(e)=>this.setState({tittle1:e.target.value})}/><br/>
                                          <input type="text" className="form-control bg-light border-0" placeholder="Picture url..."
                                           aria-label="Search" aria-describedby="basic-addon2" 
                                           value={this.state.tittle2} onChange={(e)=>this.setState({tittle2:e.target.value})}/>
                                          <br/>
                                          <a className="btn btn-success btn-icon-split" onClick={()=>{saveTitles()}}>
                                              <span className="icon text-white-50">
                                                  <i className="material-icons">done</i>
                                              </span>
                                              <span className="text">Save Changes</span>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-xl-5 mb-4">
                    <div className="card border-bottom-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <a className=" d-sm-inline-block btn btn-sm btn-success shadow-sm add-url-tag" onClick={()=>this.addContact()}><i
                                      className="material-icons icon text-white-50 add-btn">add</i></a>
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Social</div>
                                        <br/>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {
                                            this.state.contacts.map((item, index) => {
                                                return(
                                                    <div className="row">
                                                      <div className="col-xl-2">
                                                        <i className={"ion-social-"+item.icon}>:</i>
                                                      </div>
                                                      <div className="col-xl-8">
                                                          <select name="social"  className="form-control bg-light border-0" id="social-select" onChange={(e)=>this.handleSelectSocial(index,e.target.value)}>
                                                            {
                                                              this.state.supported_Social.map(icon=>{
                                                                if(icon == item.icon){
                                                                  return <option value={icon} selected>{icon}</option>
                                                                }else{
                                                                  
                                                                  return <option value={icon}>{icon}</option>
                                                                }
                                                              })
                                                            }
                                                          </select><br/>
                                                          <input type="text" className="form-control bg-light border-0" placeholder="Title..."
                                                          aria-label="Search" aria-describedby="basic-addon2" 
                                                          value={item.url} onChange={(e)=>this.handleUrlSocial(index,e.target.value)}/>
                                                          <br/>
                                                      </div>
                                                      <div className="col-xl-2">
                                                        <button 
                                                          className="btn btn-danger btn-sm" 
                                                          onClick={()=>this.deleteContact(index)}
                                                        >
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                      </div>
                                                    </div>
                                                )
                                            })

                                        }
                                        <br/>
                                        <a className="btn btn-success btn-icon-split" onClick={()=>this.editContact()}>
                                            <span className="icon text-white-50">
                                                <i className="material-icons">done</i>
                                            </span>
                                            <span className="text">Save Changes</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  <div className="col-xl-12 mb-4">
                    <div className="card border-bottom-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Text</div>
                                        <br/>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        <textarea rows="4" cols="50" type="text" className="form-control bg-light border-0" placeholder="text here..."
                                          aria-label="Search" aria-describedby="basic-addon2" 
                                          value={this.state.text} onChange={(e)=>this.setState({text:e.target.value})}/>
                                        <br/>
                                        <a className="btn btn-success btn-icon-split" onClick={()=>{saveText()}}>
                                            <span className="icon text-white-50">
                                                <i className="material-icons">done</i>
                                            </span>
                                            <span className="text">Save Changes</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
        )
  }

}

export default Contact
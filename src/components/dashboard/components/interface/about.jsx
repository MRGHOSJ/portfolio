import React from 'react'
import firebase from '../../../../firebase'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("category/about")


class About extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            text:"",
            url:""
        };
    }

    componentDidMount(){
        ref.once("value", snapshot => {
            this.setState({text:snapshot.val().text})
            this.setState({url:snapshot.val().picture})
        })
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

        let savePicture = () => {
            ref.update({
              picture: this.state.url,
            })
            toast.success('New picture is successfully saved!', {
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
                    <h1 className="h3 mb-0 text-gray-800">About</h1>
                </div>
                <div className="row">
                    <div className="col-xl-7 mb-4">
                        <div className="card border-bottom-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Picture</div>
                                            <br/>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <input type="text" className="form-control bg-light border-0" placeholder="Picture url..."
                                             aria-label="Search" aria-describedby="basic-addon2" 
                                             value={this.state.url} onChange={(e)=>this.setState({url:e.target.value})}/>
                                            <br/>
                                            <a className="btn btn-success btn-icon-split" onClick={()=>{savePicture()}}>
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

export default About
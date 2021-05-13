import React from 'react'
import firebase from '../../../../firebase'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("app")


class Settings extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            title:"",
            logo:"",
            colors:[]
        };
    }

    componentDidMount(){
        ref.once("value", snapshot => {
            this.setState({title:snapshot.val().title})
            this.setState({logo:snapshot.val().logo})
            this.setState({colors:Object.values(snapshot.val().colors)})
        })
    }

    render(){

        let saveLogo = () => {
            ref.update({
                logo: this.state.logo,
            })
            toast.success('New logo is successfully saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        let saveTitle = () => {
            ref.update({
                title: this.state.title,
            })
            toast.success('New title is successfully updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        let saveColors = () => {
            ref.update({
                colors: {
                    primary_color:this.state.colors[0],
                    secondary_color:this.state.colors[1]
                  }
            })
            toast.success('New colors are successfully updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        let updateColor = (id,color) => {
            let colors = this.state.colors

            colors[id] = color

            this.setState(colors)
        }

        return (
            <div className="container-fluid">
                <ToastContainer/>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Settings</h1>
                </div>
                <div className="row">
                    <div className="col-xl-4 mb-4">
                        <div className="card border-bottom-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Website Title</div>
                                            <br/>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <input type="text" className="form-control bg-light border-0" placeholder="Picture url..."
                                             aria-label="Search" aria-describedby="basic-addon2" 
                                             value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})}/>
                                            <br/>
                                            <a className="btn btn-success btn-icon-split" onClick={()=>{saveTitle()}}>
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
                    <div className="col-xl-8 mb-4">
                        <div className="card border-bottom-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Website Logo</div>
                                            <br/>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <div className="row">
                                                <div className="col-xl-4">
                                                    <img src={this.state.logo} className="logo-settings"/>
                                                </div>
                                                <div className="col-xl-8">
                                                    <input type="text" className="form-control bg-light border-0" placeholder="text here..."
                                                    aria-label="Search" aria-describedby="basic-addon2" 
                                                    value={this.state.logo} onChange={(e)=>this.setState({logo:e.target.value})}/>
                                                    <br/>
                                                    <a className="btn btn-success btn-icon-split" onClick={()=>{saveLogo()}}>
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
                    <div className="col-xl-5 mb-4">
                        <div className="card border-bottom-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Website Colors</div>
                                            <br/>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <div className="row">
                                                {
                                                    this.state.colors.map((color,index)=>{
                                                        if(index == 0){
                                                            return (
                                                                <div className="col-xl-6">
                                                                    Primary color:
                                                                    <input type="color" className="form-control bg-light border-0" value={color} 
                                                                        onChange={(e)=>{updateColor(index,e.target.value)}} />
                                                                <br/><br/></div>
                                                        )
                                                        }else{
                                                            return (
                                                                <div className="col-xl-6">
                                                                    Secondary color:
                                                                    <input type="color" className="form-control bg-light border-0" value={color} 
                                                                        onChange={(e)=>{updateColor(index,e.target.value)}}/>
                                                                <br/><br/></div>
                                                        )
                                                        }
                                                    
                                                    })
                                                }
                                            </div>
                                            <a className="btn btn-success btn-icon-split" onClick={()=>{saveColors()}}>
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

export default Settings
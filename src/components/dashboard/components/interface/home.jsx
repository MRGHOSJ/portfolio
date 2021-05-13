import React from 'react'
import firebase from '../../../../firebase'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("category/home")


class Home extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            tittle:"",
            list:[]
        };
    }

    componentDidMount(){
        ref.once("value", snapshot => {
            this.setState({tittle:snapshot.val().tittle})
            this.setState({list:snapshot.val().list})
        })
    }

    addList(){
        let list = this.state.list
    
        list.push("")
    
        this.setState(list)
      }
    
    deleteList(id){
        let list = this.state.list

        list.splice(id,1)

        this.setState(list)

    }

    render(){

        let saveTittle = () => {
            ref.update({
                tittle: this.state.tittle,
            })
            toast.success('New title is successfully saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        let editList = (e) => {
            let id = e.target.id
            let value = e.target.value
            let list = [...this.state.list]
            list[id]= value
            this.setState({list})
        }

        let saveList = () => {
            ref.update({
                list: this.state.list,
            })
            toast.success('New list is successfully saved!', {
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
                    <h1 className="h3 mb-0 text-gray-800">Home</h1>
                </div>
                <div className="row">
                    <div className="col-xl-7 mb-4">
                        <div className="card border-bottom-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Title</div>
                                            <br/>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <input type="text" className="form-control bg-light border-0" placeholder="Title..."
                                             aria-label="Search" aria-describedby="basic-addon2" 
                                             value={this.state.tittle} onChange={(e)=>this.setState({tittle:e.target.value})}/>
                                            <br/>
                                            <a className="btn btn-success btn-icon-split" onClick={()=>{saveTittle()}}>
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
                                    <a className=" d-sm-inline-block btn btn-sm btn-success shadow-sm add-url-tag" onClick={()=>this.addList()}><i
                                      className="material-icons icon text-white-50 add-btn">add</i></a>
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        List</div>
                                        <br/>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {
                                            this.state.list.map((item, index) => {
                                                return(
                                                    <div className="row">
                                                        <div className="col-xl-10">
                                                            <input type="text" className="form-control bg-light border-0" placeholder="Title..."
                                                            aria-label="Search" aria-describedby="basic-addon2" 
                                                            value={item} id={index} onChange={(e)=>editList(e)}/>
                                                        </div>
                                                        <div className="col-xl-2">
                                                            <button 
                                                            className="btn btn-danger btn-sm" 
                                                            onClick={()=>this.deleteList(index)}
                                                            >
                                                                <i className="material-icons">delete</i>
                                                        </button>
                                                      </div>
                                                        <br/>
                                                    </div>
                                                )
                                            })

                                        }
                                        <br/>
                                        <a className="btn btn-success btn-icon-split" onClick={()=>{saveList()}}>
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

export default Home